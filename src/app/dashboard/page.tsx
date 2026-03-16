import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  const sessions = await prisma.testSession.findMany({
    where: { userId: session.user.id, status: "completed" },
    orderBy: { completedAt: "desc" }, take: 10
  });
  const totalSessions = await prisma.testSession.count({ where: { userId: session.user.id } });
  const inProgress = await prisma.testSession.findFirst({
    where: { userId: session.user.id, status: "in_progress" },
    orderBy: { createdAt: "desc" }
  });

  const daysUntil = user?.targetTestDate
    ? Math.ceil((user.targetTestDate.getTime() - Date.now()) / 86400000)
    : null;

  const quickStart = [
    { label: "Listening", icon: "🎧", href: "/tests/listening/new", color: "bg-blue-50 border-blue-200" },
    { label: "Reading",   icon: "📖", href: "/tests/reading/new",   color: "bg-green-50 border-green-200" },
    { label: "Writing",   icon: "✍️", href: "/tests/writing/new",   color: "bg-purple-50 border-purple-200", ai: true },
    { label: "Speaking",  icon: "🎙️", href: "/tests/speaking/new",  color: "bg-amber-50 border-amber-200",  premium: true }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(" ")[0] ?? "there"} 👋</h1>
          <p className="text-slate-500 mt-1">
            {daysUntil != null ? `${daysUntil} days until your exam.` : "Set your test date in Settings to see your countdown."}
          </p>
        </div>
        {user?.plan === "free" && (
          <div className="text-sm text-slate-500 bg-white border border-slate-200 rounded-lg px-4 py-2">
            <span className="font-semibold text-slate-700">{totalSessions}</span> of 5 free tests used
          </div>
        )}
      </div>

      {inProgress && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-amber-800">You have an unfinished {inProgress.type} test</p>
            <p className="text-sm text-amber-700">Started {new Date(inProgress.createdAt).toLocaleDateString()}</p>
          </div>
          <Link href={`/tests/${inProgress.type}/new`} className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700">Continue</Link>
        </div>
      )}

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <Link href="/tests/full/new" className="bg-slate-900 text-white rounded-xl p-5 hover:bg-slate-800 transition">
          <div className="text-2xl mb-2">🏆</div>
          <h3 className="font-bold mb-1">Full Mock Test</h3>
          <p className="text-sm text-slate-400 mb-3">All 4 sections, fully timed. ~3 hours.</p>
          <span className="text-xs bg-amber-400 text-amber-900 px-2 py-1 rounded font-semibold">Premium Only</span>
        </Link>
        <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold text-slate-800 mb-3">Recent results</h3>
          {sessions.length === 0 ? (
            <p className="text-slate-400 text-sm">No completed tests yet. Start practicing!</p>
          ) : (
            <div className="space-y-2">
              {sessions.slice(0, 5).map(s => (
                <Link key={s.id} href={`/tests/${s.id}/results`}
                  className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg transition">
                  <div>
                    <span className="font-medium text-sm capitalize">{s.type}</span>
                    <span className="text-xs text-slate-400 ml-2">{new Date(s.completedAt!).toLocaleDateString()}</span>
                  </div>
                  <span className="text-blue-600 text-sm">→</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
