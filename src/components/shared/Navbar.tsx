"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

type User = { name?: string | null; email?: string | null; plan?: string } | null;

const planStyles: Record<string, string> = {
  free: "bg-slate-100 text-slate-600",
  standard: "bg-blue-100 text-blue-700",
  premium: "bg-amber-100 text-amber-700"
};

export function Navbar({ user }: { user: User }) {
  const plan = (user as { plan?: string } | null)?.plan ?? "free";
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-blue-600">CelpipReady</Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">Dashboard</Link>
              <Link href="/tests" className="text-sm text-slate-600 hover:text-slate-900">Practice</Link>
              <Link href="/settings" className="text-sm text-slate-600 hover:text-slate-900">Settings</Link>
              <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${planStyles[plan] ?? planStyles.free}`}>
                {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </span>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-slate-500 hover:text-slate-700">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">Pricing</Link>
              <Link href="/blog" className="text-sm text-slate-600 hover:text-slate-900">Blog</Link>
              <Link href="/login" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">Get Started Free</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
