"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">CelpipReady</Link>
          <p className="text-slate-500 mt-2 text-sm">Sign in to continue</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 border border-slate-300 py-3 px-4 rounded-xl font-medium hover:bg-slate-50 transition text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.1c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.4-10.6 7.4-17.3z"/>
              <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.9-6c-2.2 1.5-5 2.3-8 2.3-6.1 0-11.3-4.1-13.2-9.7H2.7v6.2C6.7 42.6 14.8 48 24 48z"/>
              <path fill="#FBBC04" d="M10.8 28.8c-.5-1.5-.8-3-.8-4.8s.3-3.3.8-4.8V13H2.7C1 16.3 0 20 0 24s1 7.7 2.7 11l8.1-6.2z"/>
              <path fill="#EA4335" d="M24 9.5c3.4 0 6.5 1.2 8.9 3.5l6.6-6.6C35.9 2.4 30.4 0 24 0 14.8 0 6.7 5.4 2.7 13l8.1 6.2c1.9-5.6 7.1-9.7 13.2-9.7z"/>
            </svg>
            Continue with Google
          </button>
        </div>
        <p className="text-xs text-slate-400 text-center mt-4">
          By signing in you agree to our{" "}
          <Link href="/terms" className="underline">Terms</Link> and{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}