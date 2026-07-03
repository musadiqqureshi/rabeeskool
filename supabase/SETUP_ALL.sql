-- RabeeSkool — Phase 1: auth + academy foundation
-- Run this in Supabase → SQL Editor. Safe to re-run.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- One row per person (mirrors auth.users, holds display data).
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now()
);

-- One row per academy (the tenant).
create table if not exists public.academies (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references auth.users (id) on delete cascade,
  name        text not null,
  slug        text not null unique,
  currency    text not null default 'PKR',
  created_at  timestamptz not null default now()
);

-- Who belongs to which academy, and in what role.
create table if not exists public.memberships (
  id           uuid primary key default gen_random_uuid(),
  academy_id   uuid not null references public.academies (id) on delete cascade,
  user_id      uuid not null references auth.users (id) on delete cascade,
  role         text not null default 'student' check (role in ('owner', 'admin', 'student')),
  created_at   timestamptz not null default now(),
  unique (academy_id, user_id)
);

create index if not exists memberships_user_idx on public.memberships (user_id);
create index if not exists memberships_academy_idx on public.memberships (academy_id);

-- ---------------------------------------------------------------------------
-- Helper: academies the current user is a member of (avoids RLS recursion)
-- ---------------------------------------------------------------------------
create or replace function public.my_academy_ids()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
  select academy_id from public.memberships where user_id = auth.uid();
$$;

-- ---------------------------------------------------------------------------
-- Auto-create a profile row whenever a new auth user signs up
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row-Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles   enable row level security;
alter table public.academies  enable row level security;
alter table public.memberships enable row level security;

-- profiles: a user can see and edit only their own profile.
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select using (id = auth.uid());

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update using (id = auth.uid());

-- academies: members can read; only the owner can create/update/delete.
drop policy if exists "members read academy" on public.academies;
create policy "members read academy" on public.academies
  for select using (id in (select public.my_academy_ids()));

drop policy if exists "owner creates academy" on public.academies;
create policy "owner creates academy" on public.academies
  for insert with check (owner_id = auth.uid());

drop policy if exists "owner updates academy" on public.academies;
create policy "owner updates academy" on public.academies
  for update using (owner_id = auth.uid());

drop policy if exists "owner deletes academy" on public.academies;
create policy "owner deletes academy" on public.academies
  for delete using (owner_id = auth.uid());

-- memberships: a user sees their own membership rows; owners manage their academy's.
drop policy if exists "read own memberships" on public.memberships;
create policy "read own memberships" on public.memberships
  for select using (
    user_id = auth.uid()
    or academy_id in (select id from public.academies where owner_id = auth.uid())
  );

drop policy if exists "insert own membership" on public.memberships;
create policy "insert own membership" on public.memberships
  for insert with check (
    user_id = auth.uid()
    or academy_id in (select id from public.academies where owner_id = auth.uid())
  );

drop policy if exists "owner manages memberships" on public.memberships;
create policy "owner manages memberships" on public.memberships
  for delete using (
    academy_id in (select id from public.academies where owner_id = auth.uid())
  );
-- RabeeSkool — Phase 2: courses, modules, lessons
-- Run this in Supabase → SQL Editor after 0001. Safe to re-run.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.courses (
  id           uuid primary key default gen_random_uuid(),
  academy_id   uuid not null references public.academies (id) on delete cascade,
  title        text not null,
  slug         text not null,
  description  text,
  price        integer not null default 0,          -- PKR, whole rupees
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz not null default now(),
  unique (academy_id, slug)
);

create table if not exists public.modules (
  id           uuid primary key default gen_random_uuid(),
  course_id    uuid not null references public.courses (id) on delete cascade,
  title        text not null,
  position     integer not null default 0,
  created_at   timestamptz not null default now()
);

create table if not exists public.lessons (
  id           uuid primary key default gen_random_uuid(),
  module_id    uuid not null references public.modules (id) on delete cascade,
  title        text not null,
  content      text,
  video_url    text,                                -- Google Drive share link
  position     integer not null default 0,
  is_preview   boolean not null default false,      -- free to watch without enrolling
  created_at   timestamptz not null default now()
);

create index if not exists courses_academy_idx on public.courses (academy_id);
create index if not exists modules_course_idx on public.modules (course_id);
create index if not exists lessons_module_idx on public.lessons (module_id);

-- ---------------------------------------------------------------------------
-- Ownership helper (does the current user own this academy?)
-- ---------------------------------------------------------------------------
create or replace function public.owns_academy(aid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.academies where id = aid and owner_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- Row-Level Security
-- ---------------------------------------------------------------------------
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;

-- courses: members see their academy's; anyone sees published; owner writes.
drop policy if exists "read courses" on public.courses;
create policy "read courses" on public.courses
  for select using (
    status = 'published' or academy_id in (select public.my_academy_ids())
  );

drop policy if exists "owner writes courses" on public.courses;
create policy "owner writes courses" on public.courses
  for all using (public.owns_academy(academy_id))
  with check (public.owns_academy(academy_id));

-- modules: visible if parent course is visible; owner writes.
drop policy if exists "read modules" on public.modules;
create policy "read modules" on public.modules
  for select using (
    exists (
      select 1 from public.courses c
      where c.id = course_id
        and (c.status = 'published' or c.academy_id in (select public.my_academy_ids()))
    )
  );

drop policy if exists "owner writes modules" on public.modules;
create policy "owner writes modules" on public.modules
  for all using (
    exists (select 1 from public.courses c where c.id = course_id and public.owns_academy(c.academy_id))
  )
  with check (
    exists (select 1 from public.courses c where c.id = course_id and public.owns_academy(c.academy_id))
  );

-- lessons: visible if parent course is visible; owner writes.
drop policy if exists "read lessons" on public.lessons;
create policy "read lessons" on public.lessons
  for select using (
    exists (
      select 1 from public.modules m
      join public.courses c on c.id = m.course_id
      where m.id = module_id
        and (c.status = 'published' or c.academy_id in (select public.my_academy_ids()))
    )
  );

drop policy if exists "owner writes lessons" on public.lessons;
create policy "owner writes lessons" on public.lessons
  for all using (
    exists (
      select 1 from public.modules m
      join public.courses c on c.id = m.course_id
      where m.id = module_id and public.owns_academy(c.academy_id)
    )
  )
  with check (
    exists (
      select 1 from public.modules m
      join public.courses c on c.id = m.course_id
      where m.id = module_id and public.owns_academy(c.academy_id)
    )
  );
-- RabeeSkool — "Find my LMS" lookup by email
-- Returns the academies a person belongs to, so a student/owner who forgot
-- their academy URL can recover it. Security definer so it can read auth.users.
-- Run in Supabase → SQL Editor after 0001/0002.

create or replace function public.find_academies_by_email(lookup_email text)
returns table (name text, slug text, role text)
language sql
security definer
set search_path = public
stable
as $$
  select a.name, a.slug, m.role
  from auth.users u
  join public.memberships m on m.user_id = u.id
  join public.academies a on a.id = m.academy_id
  where lower(u.email) = lower(trim(lookup_email))
  order by m.created_at asc;
$$;

-- Allow anonymous + authenticated callers to run the lookup.
grant execute on function public.find_academies_by_email(text) to anon, authenticated;
-- RabeeSkool — sample data for muzzammilkhan7890@gmail.com
-- Runs after the schema migrations. Idempotent.
begin;

insert into public.profiles (id, full_name)
values ('5e85dd72-3ada-424e-8742-ade55b73690d', 'Muzzammil Khan')
on conflict (id) do update set full_name = excluded.full_name;

insert into public.academies (id, owner_id, name, slug)
values ('a1111111-1111-1111-1111-111111111111', '5e85dd72-3ada-424e-8742-ade55b73690d', 'Muzzammil''s Academy', 'muzzammil-academy')
on conflict (slug) do nothing;

insert into public.memberships (academy_id, user_id, role)
values ('a1111111-1111-1111-1111-111111111111', '5e85dd72-3ada-424e-8742-ade55b73690d', 'owner')
on conflict (academy_id, user_id) do nothing;

insert into public.courses (id, academy_id, title, slug, description, price, status)
values ('c2222222-2222-2222-2222-222222222222', 'a1111111-1111-1111-1111-111111111111',
        'Digital Marketing Masterclass', 'digital-marketing-masterclass',
        'Learn to run profitable ad campaigns for Pakistani businesses — from strategy to scaling.',
        4999, 'published')
on conflict (academy_id, slug) do nothing;

insert into public.modules (id, course_id, title, position)
values ('d3333333-3333-3333-3333-333333333333', 'c2222222-2222-2222-2222-222222222222', 'Getting Started', 0)
on conflict (id) do nothing;

insert into public.lessons (id, module_id, title, content, video_url, position, is_preview)
values
('e4444444-4444-4444-4444-444444444444', 'd3333333-3333-3333-3333-333333333333',
 'Welcome & Course Overview', 'A quick intro to what you will learn in this masterclass.', null, 0, true),
('e5555555-5555-5555-5555-555555555555', 'd3333333-3333-3333-3333-333333333333',
 'Setting Up Your First Campaign', 'Step-by-step setup of your first ad campaign.', null, 1, false)
on conflict (id) do nothing;

commit;
