import { createBrowserClient } from "@supabase/ssr";
import { getRequiredSupabaseEnv } from "./supabaseEnv";

export function createClient() {
    const { url, anonKey } = getRequiredSupabaseEnv();

    return createBrowserClient(
        url,
        anonKey
    );
}
