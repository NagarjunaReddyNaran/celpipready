import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ScoreChart } from "@/components/ui/ScoreChart";

export const metadata: Metadata = { title: "Dashboard" };

type RawSession = {
  id: string;
  type: string;
  status: string;
  completedAt: Date | null;
  createdAt: Date;
  sectionScores: unknown;
  aiFeedback: unknown;
};

function extractScore(session: RawSession): number | null {
  const scores = session.sectionScores as Record<string, number> | null;
  const ai = session.aiFeedback as {
    task1?: { overallScore?: number };
    tasks?: { overallScore: number }[];
  } | null;

  if (session.type === "writing") return ai?.task1?.overallScore ?? null;
  if (session.type === "speaking") {
    const tasks = ai?.tasks;
    if (tasks?.length) return tasks.reduce((a, t) => a + t.overallScore, 0) / tasks.length;
    return null;
  }
  return scores?.[session.type] ?? null;
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  const isFree = user?.plan === "free";

  // Free users: cap at 3 sessions; paid users: fetch 20 for chart
  const sessionLimit = isFree ? 3 : 20;

  const sessions = await prisma.testSession.findMany({
    where: { userId: session.user.id, status: "completed" },
    orderBy: { completedAt: "desc" },
    take: sessionLimit,
    select: { id: true, type: true, status: true, completedAt: true, createdAt: true, sectionScores: true, aiFeedback: true }
  });

  const totalSessions = await prisma.testSession.count({ where: { userId: session.user.id } });

  const inProgress = await prisma.testSession.findFirst({
    where: { userId: session.user.id, status: "in_progress" },
    orderBy: { createdAt: "desc" }
  });

  const daysUntil = user?.targetTestDate
    ? Math.ceil((user.targetTestDate.getTime() - Date.now()) / 86400000)
    : null;

  // Build chart data — only sessions with a computable score
  const chartSessions = sessions
    .filter(s => s.completedAt != null)
    .map(s => {
      const score = extractScore(s as RawSession);
      return score != null ? { date: s.completedAt!.toISOString(), type: s.type, score } : null;
    })
    .filter((s): s is { date: string; type: string; score: number } => s !== null);

  const quickStart = [
    { label: "Listening", icon: "🎧", href: "/tests/listening/new", color: "bg-blue-50 border-blue-200" },
    { label: "Reading",   icon: "📖", href: "/tests/reading/new",   color: "bg-green-50 border-green-200" },
    { label: "Writing",   icon: "✍️", href: "/tests/writing/new",   color: "bg-purple-50 border-purple-200", ai: true },
    { label: "Speaking",  icon: "🎙️", href: "/tests/speaking/new",  color: "bg-amber-50 border-amber-200",  premium: true }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(" ")[0] ?? "there"} 👋</h1>
          <p className="text-slate-500 mt-1">
            {daysUntil != null
              ? `${daysUntil} days until your exam.`
              : "Set your test date in Settings to see your countdown."}
          </p>
        </div>
        {isFree && (
          <div className="text-sm text-slate-500 bg-white border border-slate-200 rounded-lg px-4 py-2">
            <span className="font-semibold text-slate-700">{totalSessions}</span> of 5 free tests used
          </div>
        )}
      </div>

      {/* Resume in-progress test */}
      {inProgress && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-amber-800">You have an unfinished {inProgress.type} test</p>
            <p className="text-sm text-amber-700">Started {new Date(inProgress.createdAt).toLocaleDateString()}</p>
          </div>
          <Link href={`/tests/${inProgress.type}/new`} className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700">
            Continue
          </Link>
        </div>
      )}

      {/* Quick start */}
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Start a practice test</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {quickStart.map(q => (
          <Link key={q.label} href={q.href} className={`rounded-xl border p-4 hover:shadow-sm transition block ${q.color}`}>
            <div className="text-2xl mb-2">{q.icon}</div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-semibold text-sm text-slate-800">{q.label}</span>
              {q.ai && <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-medium">AI</span>}
              {q.premium && <span className="text-xs bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-medium">Premium</span>}
            </div>
          </Link>
        ))}
      </div>

      {/* Score chart + recent results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

        <Link href="/tests/full/new" className="bg-slate-900 text-white rounded-xl p-5 hover:bg-slate-800 transition">
          <div className="text-2xl mb-2">🏆</div>
          <h3 className="font-bold mb-1">Full Mock Test</h3>
          <p className="text-sm text-slate-400 mb-3">All 4 sections, fully timed. ~3 hours.</p>
          <span className="text-xs bg-amber-400 text-amber-900 px-2 py-1 rounded font-semibold">Premium Only</span>
        </Link>

        {/* Score progress chart */}
        <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Score Progress</h3>
            {isFree && (
              <Link href="/pricing" className="text-xs text-blue-600 font-medium hover:underline">
                Upgrade to see full history →
              </Link>
            )}
          </div>

          {isFree ? (
            <div className="relative">
              {/* Blurred chart placeholder for free users */}
              <div className="h-40 bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl flex flex-col items-center justify-center gap-3 border border-slate-200 border-dashed">
                <p className="text-slate-500 text-sm font-medium">Score history chart</p>
                <p className="text-slate-400 text-xs text-center max-w-xs">
                  Upgrade to Standard or Premium to track your score trends over time.
                </p>
                <Link
                  href="/pricing"
                  className="bg-blue-600 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Unlock Full History
                </Link>
              </div>
            </div>
          ) : (
            <ScoreChart sessions={chartSessions} />
          )}
        </div>
      </div>

      {/* Recent results */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-800">Recent Results</h3>
          {isFree && totalSessions > 3 && (
            <span className="text-xs text-slate-400">Showing last 3 · <Link href="/pricing" className="text-blue-600 hover:underline">Upgrade for full history</Link></span>
          )}
        </div>

        {sessions.length === 0 ? (
          <p className="text-slate-400 text-sm">No completed tests yet. Start practicing!</p>
        ) : (
          <div className="space-y-2">
            {sessions.slice(0, 5).map(s => {
              const score = extractScore(s as RawSession);
              return (
                <Link
                  key={s.id}
                  href={`/tests/${s.id}/results`}
                  className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg transition"
                >
                  <div>
                    <span className="font-medium text-sm capitalize">{s.type}</span>
                    <span className="text-xs text-slate-400 ml-2">
                      {new Date(s.completedAt!).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {score != null && (
                      <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {score.toFixed(1)}/12
                      </span>
                    )}
                    <span className="text-blue-600 text-sm">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
