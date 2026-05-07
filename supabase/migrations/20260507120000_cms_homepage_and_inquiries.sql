create table if not exists public.dw_site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.dw_site_settings enable row level security;

create policy "dw_site_settings_select_homepage_public"
  on public.dw_site_settings
  for select
  to anon, authenticated
  using (key = 'homepage');

create table if not exists public.dw_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz,
  archived boolean not null default false
);

alter table public.dw_inquiries enable row level security;
