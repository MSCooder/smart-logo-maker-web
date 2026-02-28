"use client";

import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbfb] via-[#f6f7fb] to-[#eef2ff] px-4 overflow-hidden relative">

      {/* BACKGROUND SHAPES (same theme) */}
      <div className="absolute w-96 h-96 bg-purple-400/50 rounded-full blur-3xl -top-16 -right-16 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-pink-400/40 rounded-full blur-2xl -bottom-16 -left-12 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-blue-400/30 rounded-full blur-2xl -bottom-10 right-10 animate-pulse"></div>
<div className="absolute w-80 h-80 bg-purple-400/50 rounded-full blur-3xl -top-5 right-250 animate-pulse"></div>
      {/* CARD */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg px-8 py-8 z-10">

        {/* LOGO */}
        <div className="flex justify-center mb-5">
          <Image src="/logo3.svg" alt="Logo" width={100} height={100} priority />
        </div>

        {/* HEADING */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-1 font-medium">
            Enter your email to reset your password
          </p>
        </div>

        {/* EMAIL FIELD */}
        <div>
          <label className="text-[11.5px] font-semibold text-gray-700">
            Email Address
          </label>
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

        {/* BUTTON */}
        <button className="w-full mt-5 h-10 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 transition shadow-md">
          Send Reset Link
        </button>

        {/* BACK TO LOGIN */}
        <p className="mt-5 text-[12px] text-center text-gray-900">
          Remember your password?{" "}
          <Link
            href="/signin"
            className="text-pink-600 font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>

      {/* EXTRA GLOW */}
      <div className="absolute w-72 h-72 bg-blue-400/20 rounded-full blur-3xl z-0"></div>
    </div>
  );
}