-- =============================================
-- Mentorship.AI — Supabase MVP Schema (Corrected)
-- =============================================
-- Notes:
-- * Uses 'profiles' table (expected by the frontend).
-- * Keeps demo-open RLS policies so the anon key works.
-- * Idempotent: safe to run multiple times.
-- =============================================

-- Extensions
create extension if not exists "uuid-ossp";

-- =======================
-- Core Auth/Profile model
-- =======================
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid unique not null,                    -- Supabase Auth user id
  email text unique not null,
  role text not null check (role in ('mentee','mentor','admin')),
  created_at timestamptz default now()
);

create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists profiles_role_idx on public.profiles(role);

-- Optional: separate 'users' table for richer directory (not required by frontend)
create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  role text check (role in ('mentee','mentor','admin')),
  created_at timestamptz default now()
);
create index if not exists users_email_idx on public.users(email);
create index if not exists users_role_idx on public.users(role);

-- Mentors directory
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

-- Mentorship requests
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

-- Prevent duplicate active pairs (pending/accepted)
drop index if exists uniq_active_pair;
create unique index uniq_active_pair
  on public.requests (mentor_email, mentee_email)
  where status in ('pending','accepted');

-- Mentee goals tracking
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

-- ===================
-- Row Level Security
-- ===================
alter table public.profiles enable row level security;
alter table public.users    enable row level security;
alter table public.mentors  enable row level security;
alter table public.requests enable row level security;
alter table public.goals    enable row level security;

-- DEMO policies (permissive). Replace before production.
drop policy if exists profiles_demo_all on public.profiles;
create policy profiles_demo_all on public.profiles for all to public using (true) with check (true);

drop policy if exists users_demo_all on public.users;
create policy users_demo_all on public.users for all to public using (true) with check (true);

drop policy if exists mentors_demo_all on public.mentors;
create policy mentors_demo_all on public.mentors for all to public using (true) with check (true);

drop policy if exists requests_demo_all on public.requests;
create policy requests_demo_all on public.requests for all to public using (true) with check (true);

drop policy if exists goals_demo_all on public.goals;
create policy goals_demo_all on public.goals for all to public using (true) with check (true);

-- ============
-- Helpful view
-- ============
create or replace view public.v_requests_with_names as
select
  r.*,
  mu.name as mentee_name,
  tu.name as mentor_name
from public.requests r
left join public.users mu on mu.email = r.mentee_email
left join public.users tu on tu.email = r.mentor_email;
