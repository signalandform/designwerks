import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { mergeDeep } from "@/lib/cms/merge";
import { DEFAULT_HOME_CONTENT } from "@/lib/cms/default-content";
import type { HomeContent } from "@/lib/cms/types";
import { isSiteAdmin } from "@/lib/cms/admin-auth";
import { upsertHomeContent } from "@/lib/cms/site-content";
import { isSupabaseConfigured } from "@/lib/supabase/clients";

export async function PATCH(request: Request) {
  if (!(await isSiteAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase environment variables are not set." },
      { status: 503 },
    );
  }
  let patch: unknown;
  try {
    patch = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  try {
    const nextContent = mergeDeep(
      DEFAULT_HOME_CONTENT as unknown as Record<string, unknown>,
      patch,
    ) as HomeContent;
    await upsertHomeContent(nextContent);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save homepage content." },
      { status: 500 },
    );
  }
}
