import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// ── Section metadata shown in each card ──────────────────────────────────────
const SECTIONS = [
  { icon: "🎧", label: "Listening", questions: 44, time: "~47 min" },
  { icon: "📖", label: "Reading",   questions: 38, time: "~55 min" },
  { icon: "✍️", label: "Writing",  questions: 2,  time: "~53 min" },
  { icon: "🎙️", label: "Speaking", questions: 8,  time: "~20 min" },
];

const WHAT_TO_EXPECT = [
  "All 4 sections in sequence — exactly like the real CELPIP exam.",
  "Timed sections with automatic progression when the clock runs out.",
  "AI-scored writing and speaking sections with detailed feedback.",
  "A full score report (1–12 per section) available immediately after completion.",
];

export default async function FullMockTestStartPage() {
  // ── Auth guard ──────────────────────────────────────────────────────────────
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  // ── Plan / gate check ───────────────────────────────────────────────────────
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  });

  const isFree = !user || user.plan === "free";

  // Count completed full-mock sessions for free users
  let fullSessionCount = 0;
  if (isFree) {
    fullSessionCount = await prisma.testSession.count({
      where: { userId, type: "full", status: "completed" },
    });
  }

  // Free users get 2 free full mocks; after that they must upgrade
  const isGated = isFree && fullSessionCount >= 2;

  // ── Gated screen ────────────────────────────────────────────────────────────
  if (isGated) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-5">🔒</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          You&apos;ve used your free mock tests
        </h1>
        <p className="text-slate-600 mb-6">
          Free accounts include <strong>2 full mock tests</strong>. Upgrade to
          Premium for unlimited access and detailed AI feedback on every attempt.
        </p>
        <Link
          href="/pricing"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Upgrade to Premium →
        </Link>
        <div className="mt-4">
          <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-700 underline">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ── Normal start page ───────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🏆</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Full Mock Test</h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          Complete all 4 sections in a single sitting — just like the real CELPIP exam.
          Total time is approximately 3 hours.
        </p>
        {isFree && (
          <div className="mt-4 inline-block text-xs bg-amber-50 border border-amber-200 text-amber-700 px-4 py-1.5 rounded-full font-medium">
            Free plan · {2 - fullSessionCount} full mock test{2 - fullSessionCount === 1 ? "" : "s"} remaining
          </div>
        )}
      </div>

      {/* Choose Your Test */}
      <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Choose Your Test</h2>

      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        {(["mock-a", "mock-b"] as const).map((set, idx) => (
          <div
            key={set}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-bold text-slate-900">
                Mock Test {idx === 0 ? "A" : "B"}
              </span>
              <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                ~3 hours
              </span>
            </div>

            {/* Section list */}
            <div className="space-y-2 mb-6">
              {SECTIONS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span>{s.icon}</span>
                    <span className="font-medium">{s.label}</span>
                    <span className="text-slate-400 text-xs">· {s.questions} Q</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">{s.time}</span>
                </div>
              ))}
            </div>

            <Link
              href={`/tests/mock/new?set=${set}`}
              className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
            >
              Start Mock Test {idx === 0 ? "A" : "B"} →
            </Link>
          </div>
        ))}
      </div>

      {/* What to expect */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
        <h3 className="font-semibold text-slate-800 mb-4">What to expect</h3>
        <ul className="space-y-2">
          {WHAT_TO_EXPECT.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="mt-0.5 text-blue-500 shrink-0">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-slate-400 leading-relaxed">
        This is a practice simulation. Actual CELPIP results may vary. Scores are
        AI-generated estimates and are not official assessments.
      </p>

      {/* Back link */}
      <div className="text-center mt-6">
        <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-700 underline">
          Back to dashboard
        </Link>
      </div>

    </div>
  );
}
