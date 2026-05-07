import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getSiteSlug,
  getSupabasePublishableKey,
  getSupabaseUrl,
} from "@/lib/supabase/env";
import { DW_SITE_ADMINS } from "@/lib/supabase/designwerks-tables";

async function hasSiteAdminRole(
  supabase: SupabaseClient,
  siteSlug: string,
): Promise<boolean> {
  const { data } = await supabase
    .from(DW_SITE_ADMINS)
    .select("site_slug")
    .eq("site_slug", siteSlug)
    .maybeSingle();
  return Boolean(data);
}

function redirectToLogin(request: NextRequest, params: Record<string, string>) {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url);
}

function forwardSetCookies(from: NextResponse, to: NextResponse) {
  const headersWithGetter = from.headers as Headers & {
    getSetCookie?: () => string[];
  };
  const cookiesList =
    typeof headersWithGetter.getSetCookie === "function"
      ? headersWithGetter.getSetCookie()
      : [];
  for (const cookieString of cookiesList) {
    to.headers.append("Set-Cookie", cookieString);
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isLogin =
    pathname === "/admin/login" || pathname.startsWith("/admin/login/");

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next({ request });
  }

  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  const siteSlug = getSiteSlug();

  if (!url || !key || !siteSlug) {
    if (!isLogin) {
      return redirectToLogin(request, { error: "config" });
    }
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([headerKey, headerValue]) => {
          response.headers.set(headerKey, headerValue);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isLogin) {
    if (user && (await hasSiteAdminRole(supabase, siteSlug))) {
      const destination = request.nextUrl.clone();
      destination.pathname = "/admin";
      destination.search = "";
      return NextResponse.redirect(destination);
    }
    return response;
  }

  if (!user) {
    const nextTarget = `${pathname}${request.nextUrl.search}`;
    return redirectToLogin(request, { next: nextTarget });
  }

  if (!(await hasSiteAdminRole(supabase, siteSlug))) {
    await supabase.auth.signOut();
    const denied = redirectToLogin(request, { error: "forbidden" });
    forwardSetCookies(response, denied);
    return denied;
  }

  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
