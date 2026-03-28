create extension if not exists pgcrypto;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  owner_email text,
  name text not null,
  code text not null unique,
  is_active boolean not null default true,
  max_open_per_guest integer not null default 3,
  created_at timestamptz not null default now()
);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  guest_name text not null,
  song_title text not null,
  artist text not null,
  status text not null default 'open' check (status in ('open','accepted','played','rejected')),
  created_at timestamptz not null default now()
);

insert into public.events (name, code, is_active, max_open_per_guest)
values ('Demo Party', 'PARTY-2026', true, 3)
on conflict (code) do nothing;
