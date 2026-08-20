import { createClient } from "@supabase/supabase-js";

const FUNCENTER_URL =
  process.env.FUNCENTER_SUPABASE_URL ||
  "https://eduehtghmpymaducmyid.supabase.co";

export function createOneToOneClient() {
  const fallbackKey =
    process.env.NEXT_PUBLIC_SUPABASE_URL === FUNCENTER_URL
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      : undefined;
  const anonKey = process.env.FUNCENTER_SUPABASE_ANON_KEY || fallbackKey;

  if (!anonKey) {
    throw new Error(
      "FUNCENTER_SUPABASE_ANON_KEY is required for one-to-one enrollment"
    );
  }

  return createClient(FUNCENTER_URL, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
