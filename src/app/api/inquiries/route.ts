import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { insertInquiry } from "@/lib/cms/site-content";

const MAX_LEN = { name: 200, email: 320, message: 8000 };

function sanitize(s: string): string {
  return s.trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
    };
    const name = sanitize(String(body.name ?? ""));
    const email = sanitize(String(body.email ?? ""));
    const message = sanitize(String(body.message ?? ""));
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }
    if (
      name.length > MAX_LEN.name ||
      email.length > MAX_LEN.email ||
      message.length > MAX_LEN.message
    ) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }
    await insertInquiry({ name, email, message });
    revalidatePath("/admin");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error:
          "We could not save your inquiry yet. Please email us directly or try again later.",
      },
      { status: 503 },
    );
  }
}
