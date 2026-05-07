-- One-time upgrade: unprefixed CMS tables from earlier revisions → dw_* names.

do $$
begin
  if to_regclass('public.site_settings') is not null
     and to_regclass('public.dw_site_settings') is null
  then
    alter table public.site_settings rename to dw_site_settings;
  end if;
end $$;

do $$
begin
  if to_regclass('public.inquiries') is not null
     and to_regclass('public.dw_inquiries') is null
  then
    alter table public.inquiries rename to dw_inquiries;
  end if;
end $$;

do $$
begin
  if to_regclass('public.site_admins') is not null
     and to_regclass('public.dw_site_admins') is null
  then
    alter table public.site_admins rename to dw_site_admins;
  end if;
end $$;

alter index if exists public.site_admins_user_id_idx rename to dw_site_admins_user_id_idx;
