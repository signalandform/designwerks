import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isSiteAdmin } from "@/lib/cms/admin-auth";
import { setInquiryRead } from "@/lib/cms/site-content";

export async function PATCH(request: Request) {
  if (!(await isSiteAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let id = "";
  let read = true;
  try {
    const body = (await request.json()) as {
      id?: unknown;
      read?: unknown;
    };
    id = String(body.id ?? "");
    read = body.read !== false;
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }
  try {
    await setInquiryRead(id, read);
    revalidatePath("/admin", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}
