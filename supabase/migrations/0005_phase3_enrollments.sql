-- RabeeSkool — Phase 3: manual payments + enrollments
-- Run in Supabase → SQL Editor after 0001–0004. Safe to re-run.

-- ---------------------------------------------------------------------------
-- Academy payment details (shown to students at checkout)
-- ---------------------------------------------------------------------------
alter table public.academies add column if not exists bank_name text;
alter table public.academies add column if not exists account_title text;
alter table public.academies add column if not exists account_number text;
alter table public.academies add column if not exists jazzcash_number text;
alter table public.academies add column if not exists easypaisa_number text;
alter table public.academies add column if not exists payment_instructions text;

-- ---------------------------------------------------------------------------
-- Enrollments (one per student per course; carries the manual-payment record)
-- ---------------------------------------------------------------------------
create table if not exists public.enrollments (
  id            uuid primary key default gen_random_uuid(),
  academy_id    uuid not null references public.academies (id) on delete cascade,
  course_id     uuid not null references public.courses (id) on delete cascade,
  student_id    uuid not null references auth.users (id) on delete cascade,
  amount        integer not null default 0,          -- PKR
  method        text not null default 'bank' check (method in ('bank','jazzcash','easypaisa','free')),
  proof_url     text,
  status        text not null default 'pending' check (status in ('pending','active','rejected')),
  invoice_no    text,
  created_at    timestamptz not null default now(),
  reviewed_at   timestamptz,
  unique (course_id, student_id)
);

create index if not exists enrollments_academy_idx on public.enrollments (academy_id);
create index if not exists enrollments_student_idx on public.enrollments (student_id);
create index if not exists enrollments_status_idx on public.enrollments (academy_id, status);

-- Helper: does the current user have an ACTIVE enrollment in this course?
create or replace function public.is_enrolled(cid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.enrollments
    where course_id = cid and student_id = auth.uid() and status = 'active'
  );
$$;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.enrollments enable row level security;

-- Student sees their own enrollments; owner sees their academy's.
drop policy if exists "read enrollments" on public.enrollments;
create policy "read enrollments" on public.enrollments
  for select using (
    student_id = auth.uid() or public.owns_academy(academy_id)
  );

-- Student creates their own pending enrollment.
drop policy if exists "student enrolls" on public.enrollments;
create policy "student enrolls" on public.enrollments
  for insert with check (student_id = auth.uid());

-- Owner updates status (approve/reject); student may not change their own row.
drop policy if exists "owner reviews enrollments" on public.enrollments;
create policy "owner reviews enrollments" on public.enrollments
  for update using (public.owns_academy(academy_id))
  with check (public.owns_academy(academy_id));

-- ---------------------------------------------------------------------------
-- Payment-proof storage bucket (screenshots students upload)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', true)
on conflict (id) do nothing;

drop policy if exists "authenticated upload proofs" on storage.objects;
create policy "authenticated upload proofs" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'payment-proofs');

drop policy if exists "public read proofs" on storage.objects;
create policy "public read proofs" on storage.objects
  for select using (bucket_id = 'payment-proofs');
