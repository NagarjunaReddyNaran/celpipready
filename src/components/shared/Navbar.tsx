"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const planStyles: Record<string, string> = {
  free:     "bg-slate-100 text-slate-600",
  standard: "bg-blue-100 text-blue-700",
  premium:  "bg-amber-100 text-amber-700",
};

export function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const plan = (user as { plan?: string } | undefined)?.plan ?? "free";
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-base sm:text-lg text-blue-600" onClick={close}>
          CelpipEdge
        </Link>

        {status === "loading" ? (
          <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
        ) : (
          <>
            {/* ── Desktop nav ─────────────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">Dashboard</Link>
                  <Link href="/tests"     className="text-sm text-slate-600 hover:text-slate-900">Practice</Link>
                  <Link href="/settings"  className="text-sm text-slate-600 hover:text-slate-900">Settings</Link>
                  <Link href="/contact"   className="text-sm text-slate-600 hover:text-slate-900">Contact</Link>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${planStyles[plan] ?? planStyles.free}`}>
                    {plan.charAt(0).toUpperCase() + plan.slice(1)}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-sm text-slate-500 hover:text-slate-700 transition"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">Pricing</Link>
                  <Link href="/blog"    className="text-sm text-slate-600 hover:text-slate-900">Blog</Link>
                  <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900">Contact</Link>
                  <Link href="/login"   className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition">
                    Get Started Free
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile hamburger ─────────────────────────────────────── */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition"
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </>
        )}
      </div>

      {/* ── Mobile dropdown ───────────────────────────────────────────── */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          {user ? (
            <>
              <div className="flex items-center gap-2 px-2 py-2 mb-1">
                <span className="text-sm font-medium text-slate-700">{user.name ?? user.email}</span>
                <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${planStyles[plan] ?? planStyles.free}`}>
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </span>
              </div>
              {[
                { href: "/dashboard", label: "Dashboard" },
                { href: "/tests",     label: "Practice"  },
                { href: "/settings",  label: "Settings"  },
                { href: "/contact",   label: "Contact"   },
              ].map(({ href, label }) => (
                <Link key={href} href={href} onClick={close}
                  className="block px-2 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition">
                  {label}
                </Link>
              ))}
              <button
                onClick={() => { close(); signOut({ callbackUrl: "/" }); }}
                className="w-full text-left px-2 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              {[
                { href: "/pricing", label: "Pricing" },
                { href: "/blog",    label: "Blog"    },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} onClick={close}
                  className="block px-2 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition">
                  {label}
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/login" onClick={close}
                  className="block text-center bg-blue-600 text-white text-sm px-4 py-2.5 rounded-xl hover:bg-blue-700 font-medium transition">
                  Get Started Free
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
