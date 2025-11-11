-- =============================================
-- Mentorship.AI — Supabase Demo Schema (Updated)
-- =============================================
-- This schema is suitable for an MVP / demo.
-- It keeps permissive RLS so the browser Anon key works.
-- Replace policies with stricter ones before production.
-- =============================================

create extension if not exists "uuid-ossp";

-- ---------- users ----------
create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  role text check (role in ('mentee','mentor','admin')),
  created_at timestamptz default now()
);

create index if not exists users_email_idx on public.users(email);
create index if not exists users_role_idx on public.users(role);

-- ---------- mentors ----------
create table if not exists public.mentors (
  id uuid primary key default uuid_generate_v4(),
  user_email text not null references public.users(email) on delete cascade,
  timezone text,
  availability text[],      -- e.g. {"Mon 17:00","Sat 10:00"}
  types text[],             -- e.g. {"Career","Technical","Portfolio"}
  skills text[],            -- e.g. {"Energy modelling","Architecture"}
  topics text[],            -- e.g. {"LEED","BREEAM","AI","Digital twin"}
  bio text,
  meeting_link text,
  linkedin text,
  created_at timestamptz default now()
);

create index if not exists mentors_email_idx on public.mentors(user_email);

-- ---------- requests ----------
create table if not exists public.requests (
  id uuid primary key default uuid_generate_v4(),
  mentee_email text not null references public.users(email) on delete cascade,
  mentor_email text not null references public.users(email) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted','declined')),
  note text,
  interests text[],         -- mentee-selected interests at request time
  created_at timestamptz default now(),
  decided_at timestamptz
);

create index if not exists requests_mentor_status_idx on public.requests (mentor_email, status);
create index if not exists requests_mentee_idx on public.requests (mentee_email);

-- Prevent duplicate active pairs (optional)
drop index if exists uniq_active_pair;
create unique index uniq_active_pair
  on public.requests (mentor_email, mentee_email)
  where status in ('pending','accepted');

-- ---------- goals ----------
create table if not exists public.goals (
  id uuid primary key default uuid_generate_v4(),
  mentee_email text not null references public.users(email) on delete cascade,
  mentor_email text references public.users(email) on delete set null,
  title text not null,
  notes text,
  status text default 'open' check (status in ('open','in_progress','done')),
  progress integer default 0 check (progress between 0 and 100),
  start_date date,
  due_date date,
  created_at timestamptz default now()
);

-- =============================================
-- Row Level Security (demo: permissive) 
-- =============================================
alter table public.users enable row level security;
alter table public.mentors enable row level security;
alter table public.requests enable row level security;
alter table public.goals enable row level security;

-- In a real app, lock these down. For MVP/demo we allow all.
do $$ begin
  if not exists (select 1 from pg_policies where polname = 'users_demo_all') then
    create policy users_demo_all on public.users for all using (true) with check (true);
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_policies where polname = 'mentors_demo_all') then
    create policy mentors_demo_all on public.mentors for all using (true) with check (true);
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_policies where polname = 'requests_demo_all') then
    create policy requests_demo_all on public.requests for all using (true) with check (true);
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_policies where polname = 'goals_demo_all') then
    create policy goals_demo_all on public.goals for all using (true) with check (true);
  end if;
end $$;

-- =============================================
-- Helpful Views
-- =============================================
create or replace view public.v_requests_with_names as
select
  r.*,
  mu.name as mentee_name,
  tu.name as mentor_name
from public.requests r
left join public.users mu on mu.email = r.mentee_email
left join public.users tu on tu.email = r.mentor_email;
