import { DEFAULT_HOME_CONTENT } from "./default-content";
import { mergeDeep } from "./merge";
import type { HomeContent, InquiryRow } from "./types";
import { getPublicSupabase, getServiceSupabase } from "../supabase/clients";
import {
  DW_INQUIRIES,
  DW_SITE_SETTINGS,
} from "../supabase/designwerks-tables";

const HOMEPAGE_KEY = "homepage";

export async function getHomeContent(): Promise<HomeContent> {
  const client = getPublicSupabase();
  if (!client) {
    return DEFAULT_HOME_CONTENT;
  }
  const { data, error } = await client
    .from(DW_SITE_SETTINGS)
    .select("value")
    .eq("key", HOMEPAGE_KEY)
    .maybeSingle();
  if (error || !data?.value) {
    return DEFAULT_HOME_CONTENT;
  }
  return mergeDeep(
    DEFAULT_HOME_CONTENT as unknown as Record<string, unknown>,
    data.value,
  ) as HomeContent;
}

export async function upsertHomeContent(content: HomeContent): Promise<void> {
  const client = getServiceSupabase();
  if (!client) {
    throw new Error("Supabase service client is not configured");
  }
  const { error } = await client.from(DW_SITE_SETTINGS).upsert(
    {
      key: HOMEPAGE_KEY,
      value: content as unknown as Record<string, unknown>,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );
  if (error) {
    throw error;
  }
}

export async function listInquiries(limit = 100): Promise<InquiryRow[]> {
  const client = getServiceSupabase();
  if (!client) return [];
  const { data, error } = await client
    .from(DW_INQUIRIES)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data as InquiryRow[];
}

export async function insertInquiry(input: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const client = getServiceSupabase();
  if (!client) {
    throw new Error("Supabase service client is not configured");
  }
  const { error } = await client.from(DW_INQUIRIES).insert({
    name: input.name,
    email: input.email,
    message: input.message,
  });
  if (error) {
    throw error;
  }
}

export async function setInquiryRead(id: string, read: boolean): Promise<void> {
  const client = getServiceSupabase();
  if (!client) {
    throw new Error("Supabase service client is not configured");
  }
  const { error } = await client
    .from(DW_INQUIRIES)
    .update({ read_at: read ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) {
    throw error;
  }
}
