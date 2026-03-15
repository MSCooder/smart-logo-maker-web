"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { getSupabaseEnv } from "@/lib/supabaseEnv";
import { headers } from "next/headers";

function ensureSupabaseConfigured(pathname: "/auth/signin" | "/auth/signup") {
    const { isConfigured } = getSupabaseEnv();
    if (!isConfigured) {
        redirect(
            `${pathname}?error=${encodeURIComponent(
                "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
            )}`
        );
    }
}

// ─── Sign In ────────────────────────────────────────────────────────────────
export async function signIn(formData: FormData) {
    ensureSupabaseConfigured("/auth/signin");
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        redirect(`/auth/signin?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath("/", "layout");
    redirect("/");
}

// ─── Sign Up ────────────────────────────────────────────────────────────────
export async function signUp(formData: FormData) {
    ensureSupabaseConfigured("/auth/signup");
    const supabase = await createClient();

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: fullName },
        },
    });

    if (error) {
        redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath("/", "layout");
    redirect("/auth/signup?message=Check+your+email+to+confirm+your+account.");
}

// ─── Sign Out ───────────────────────────────────────────────────────────────
export async function signOut() {
    ensureSupabaseConfigured("/auth/signin");
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/auth/signin");
}

// ─── Google OAuth ────────────────────────────────────────────────────────────
export async function signInWithGoogle() {
    ensureSupabaseConfigured("/auth/signin");
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            redirect(
                `/auth/signin?error=${encodeURIComponent(
                    error.message || "Google sign-in is not enabled. Please enable it in Supabase."
                )}`
            );
        }

        if (data?.url) {
            redirect(data.url);
        }
    } catch (err: unknown) {
        // If the error is a NEXT_REDIRECT (from redirect()), re-throw it
        if (
            err instanceof Error &&
            (err as Error & { digest?: string }).digest?.startsWith("NEXT_REDIRECT")
        ) {
            throw err;
        }
        redirect(
            `/auth/signin?error=${encodeURIComponent(
                "Google sign-in is not configured yet. Please use email and password."
            )}`
        );
    }
}
