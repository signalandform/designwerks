export function getSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

/** Publishable (preferred) or legacy anon JWT — never use the secret/service key here. */
export function getSupabasePublishableKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function getSiteSlug(): string | undefined {
  const slug = process.env.SITE_SLUG?.trim();
  return slug || undefined;
}
