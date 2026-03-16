import { auth } from "@/lib/auth";
import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Practice Tests" };

export default async function TestsPage() {
  const session = await auth();
  const tests = [
    { section: "listening", label: "Listening Practice",  icon: "🎧", parts: "8 parts",      time: "~47 min", difficulty: "Intermediate", href: "/tests/listening/new",  ai: false, premium: false },
    { section: "reading",   label: "Reading Practice",    icon: "📖", parts: "38 questions", time: "~55 min", difficulty: "Intermediate", href: "/tests/reading/new",    ai: false, premium: false },
    { section: "writing",   label: "Writing Practice",    icon: "✍️", parts: "2 tasks",      time: "~53 min", difficulty: "Intermediate", href: "/tests/writing/new",    ai: true,  premium: false },
    { section: "speaking",  label: "Speaking Practice",   icon: "🎙️", parts: "8 tasks",      time: "~20 min", difficulty: "Intermediate", href: "/tests/speaking/new",   ai: true,  premium: true  },
    { section: "full",      label: "Full Mock Test",      icon: "🏆", parts: "All sections", time: "~3 hours",difficulty: "Advanced",     href: "/tests/full/new",       ai: true,  premium: true  }
  ];
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Practice Tests</h1>
      <p className="text-slate-500 mb-8">Choose a section or take a full timed mock exam.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map(t => (
          <div key={t.section} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <span className="text-3xl">{t.icon}</span>
              <div className="text-right">
                <p className="text-xs text-slate-500">{t.parts}</p>
                <p className="text-xs font-mono text-slate-400">{t.time}</p>
              </div>
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{t.label}</h3>
            <div className="flex gap-1.5 mb-3">
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{t.difficulty}</span>
              {t.ai && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium">AI</span>}
              {t.premium && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">Premium</span>}
            </div>
            <div className="mt-auto">
              {session ? (
                <Link href={t.href} className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition ${t.premium ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                  {t.premium ? "🔒 Upgrade to Start" : "Start Test"}
                </Link>
              ) : (
                <Link href="/login" className="block text-center py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700">
                  Sign in to Start
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
