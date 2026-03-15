const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const hasSupabaseEnv = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export function getSupabaseEnv() {
    return {
        url: SUPABASE_URL,
        anonKey: SUPABASE_ANON_KEY,
        isConfigured: hasSupabaseEnv,
    };
}

export function getRequiredSupabaseEnv() {
    if (!hasSupabaseEnv) {
        throw new Error(
            "Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
        );
    }

    return {
        url: SUPABASE_URL,
        anonKey: SUPABASE_ANON_KEY,
    };
}
