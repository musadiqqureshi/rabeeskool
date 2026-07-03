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
