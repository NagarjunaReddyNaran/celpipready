"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FullMockTestPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkPlan() {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "full" }),
      });
      const data = await res.json();
      if (data.premiumRequired || data.limitReached) {
        router.push("/pricing");
      }
    }
    checkPlan();
  }, [router]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-6">🏆</div>
      <h1 className="text-2xl font-bold text-slate-900 mb-3">Full Mock Test</h1>
      <p className="text-slate-600 mb-8">
        The full mock test includes all 4 sections in sequence — Listening, Reading, Writing, and Speaking — just like the real CELPIP exam.
      </p>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 text-left">
        <h2 className="font-semibold text-slate-800 mb-4">Test Structure</h2>
        <div className="space-y-3">
          {[
            { section: "Listening", time: "~47 min", icon: "🎧" },
            { section: "Reading", time: "~55 min", icon: "📖" },
            { section: "Writing", time: "~53 min", icon: "✍️" },
            { section: "Speaking", time: "~20 min", icon: "🎙️" },
          ].map(s => (
            <div key={s.section} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <span className="font-medium text-slate-800">{s.section}</span>
              </div>
              <span className="text-sm font-mono text-slate-500">{s.time}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between">
          <span className="font-semibold text-slate-800">Total time</span>
          <span className="font-mono font-semibold text-slate-800">~3 hours</span>
        </div>
      </div>
      <div className="flex gap-3">
        <Link href="/tests/listening/new" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 text-center">
          Start with Listening →
        </Link>
        <Link href="/dashboard" className="flex-1 border border-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 text-center">
          Back to Dashboard
        </Link>
      </div>
      <p className="text-xs text-slate-400 mt-4">
        Complete each section in order. Your results will be saved after each section.
      </p>
    </div>
  );
}
