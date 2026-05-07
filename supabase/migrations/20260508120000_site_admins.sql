-- Maps Supabase Auth users to CMS admin access per logical site.
-- Prefixed with dw_ so this app’s tables stay identifiable on a shared database.

create table if not exists public.dw_site_admins (
  site_slug text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (site_slug, user_id)
);

create index if not exists dw_site_admins_user_id_idx on public.dw_site_admins (user_id);

alter table public.dw_site_admins enable row level security;

create policy "dw_site_admins_select_own_memberships"
  on public.dw_site_admins
  for select
  to authenticated
  using (auth.uid() = user_id);
