"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">CelpipReady</Link>
          <p className="text-slate-500 mt-2 text-sm">Sign in or create your free account</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 border border-slate-300 py-3 px-4 rounded-xl font-medium hover:bg-slate-50 transition text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.1c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.4-10.6 7.4-17.3z"/>
              <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.9-6c-2.2 1.5-5 2.3-8 2.3-6.1 0-11.3-4.1-13.2-9.7H2.7v6.2C6.7 42.6 14.8 48 24 48z"/>
              <path fill="#FBBC04" d="M10.8 28.8c-.5-1.5-.8-3-.8-4.8s.3-3.3.8-4.8V13H2.7C1 16.3 0 20 0 24s1 7.7 2.7 11l8.1-6.2z"/>
              <path fill="#EA4335" d="M24 9.5c3.4 0 6.5 1.2 8.9 3.5l6.6-6.6C35.9 2.4 30.4 0 24 0 14.8 0 6.7 5.4 2.7 13l8.1 6.2c1.9-5.6 7.1-9.7 13.2-9.7z"/>
            </svg>
            Continue with Google
          </button>

          <div className="mt-5 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              First time here? Your account will be created automatically when you sign in with Google.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-xs font-semibold text-blue-800 mb-2">Free account includes:</p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>✓ 5 free practice tests</li>
            <li>✓ Listening, Reading & Writing sections</li>
            <li>✓ Instant scoring on all tests</li>
            <li>✓ No credit card required</li>
          </ul>
        </div>

        <p className="text-xs text-slate-400 text-center mt-4">
          By signing in you agree to our{" "}
          <Link href="/terms" className="underline hover:text-slate-600">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>
        </p>

      </div>
    </div>
  );
}
