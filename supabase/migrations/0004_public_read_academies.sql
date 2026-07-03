-- RabeeSkool — allow anyone to read an academy's public storefront info.
-- Without this, anonymous visitors can't load /a/[slug] pages because the
-- original policy only let members read the academies table.
-- Run in Supabase → SQL Editor. Safe to re-run.

drop policy if exists "public read academies" on public.academies;
create policy "public read academies" on public.academies
  for select using (true);
