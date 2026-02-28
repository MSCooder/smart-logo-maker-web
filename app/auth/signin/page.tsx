// @ts-nocheck
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";


export default function Login() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful! Check your email.");
      console.log(data);
    }

    setLoading(false);
  };
  const handleGoogleLogin = async () => {
  setLoading(true);

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    alert(error.message);
    setLoading(false);
  }
};

  return (
   <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-[#fdfbfb] via-[#f6f7fb] to-[#eef2ff] px-4 md:px-12 overflow-hidden">

      {/* LEFT - LOGIN FORM */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg px-8 py-8 md:mr-8 z-10">
        <div className="flex justify-center mb-5">
          <Image src="/logo3.svg" alt="Logo" width={100} height={100} priority />
        </div>

        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-1 font-medium">
            Login to continue
          </p>
        </div>

        <div>
            <label className="text-[11.5px] font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full h-9 px-3.5 rounded-xl
              border border-gray-300 text-sm text-gray-900 placeholder-gray-400
              transition-colors duration-200
              hover:border-pink-500 hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="text-[11.5px] font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full h-9 px-3.5 rounded-xl
              border border-gray-300 text-sm text-gray-900 placeholder-gray-400
              transition-colors duration-200
              hover:border-pink-500 hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

        <div className="flex items-center justify-between mt-3 text-[12px] text-gray-900">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-pink-500" />
            Remember me
          </label>
         <Link href="/auth/forgot" className="text-pink-600 font-semibold hover:underline">
  Forgot?
</Link>
        </div>

        <button className="w-full mt-4 h-10 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 transition shadow-md">
          Login
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-[11px] text-gray-900 font-medium">OR</span>

          <div className="flex-1 h-px bg-gray-300" />

        </div>

        <button onClick={handleGoogleLogin} className="w-full h-10 rounded-xl border border-gray-300 flex items-center justify-center gap-2 text-sm text-gray-900 font-medium hover:bg-gray-100 transition">
          <img src="/google.png" className="w-4 h-4" />
          Continue with Google
        </button>

        <p className="mt-4 text-[12px] text-center text-gray-900">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-pink-600 font-semibold hover:underline">
            Sign up
          </Link>
          
        </p>
      </div>


      {/* RIGHT - ATTRACTIVE ILLUSTRATION */}
      <div className="hidden md:flex flex-1 relative justify-center items-center w-full h-[500px] md:h-[600px]">

        {/* BACKGROUND SHAPES */}
        <div className="absolute w-96 h-96 bg-purple-400/50 rounded-full blur-3xl -top-16 -right-16 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-pink-400/40 rounded-full blur-2xl -bottom-16 -left-12 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-blue-400/30 rounded-full blur-2xl -bottom-10 right-10 animate-pulse"></div>
        {/* MAIN ROBOT IMAGE */}
       <div className="absolute top-0 left-30 w-[780px] h-[780px] pointer-events-none">

  <Image
    src="/light.svg"
    alt="light"
    fill
    className="object-contain"
    priority
  />
</div>

        {/* FLOATING GLOW */}
        <div className="absolute w-72 h-72 bg-blue-400/20 rounded-full blur-3xl z-0"></div>
      </div>
    </div>
  );
}
