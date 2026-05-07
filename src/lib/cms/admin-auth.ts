import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSiteSlug } from "@/lib/supabase/env";
import { DW_SITE_ADMINS } from "@/lib/supabase/designwerks-tables";

/** Verified Supabase session plus membership in dw_site_admins for this deployment's SITE_SLUG. */
export async function isSiteAdmin(): Promise<boolean> {
  const siteSlug = getSiteSlug();
  if (!siteSlug) return false;
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) return false;
    const { data } = await supabase
      .from(DW_SITE_ADMINS)
      .select("site_slug")
      .eq("site_slug", siteSlug)
      .maybeSingle();
    return Boolean(data);
  } catch {
    return false;
  }
}
