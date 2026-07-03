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
