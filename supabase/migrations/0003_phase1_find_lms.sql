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
