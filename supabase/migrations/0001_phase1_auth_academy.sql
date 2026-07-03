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
