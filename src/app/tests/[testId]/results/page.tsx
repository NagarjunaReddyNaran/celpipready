import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { FeedbackCard } from "@/components/ui/FeedbackCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Test Results" };

function clbLabel(score: number) {
  if (score >= 10) return "CLB 10–12 — Expert";
  if (score >= 8) return "CLB 8–9 — Advanced";
  if (score >= 6) return "CLB 6–7 — Competent";
  if (score >= 4) return "CLB 4–5 — Developing";
  return "CLB 1–3 — Beginning";
}

type WritingFeedback = {
  task1?: {
    dimensions: Record<string, { score: number; explanation: string; tip: string }>;
    overallScore: number;
    strength: string;
    improvement: string;
    languageSuggestions: { original: string; improved: string; reason: string }[];
  };
};

type SpeakingFeedback = {
  tasks?: { overallScore: number; strength: string; improvement: string; dimensions: Record<string, { score: number; explanation: string; tip: string }> }[];
};

type AiFeedback = WritingFeedback & SpeakingFeedback;

export default async function ResultsPage({ params }: { params: { testId: string } }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const testSession = await prisma.testSession.findUnique({ where: { id: params.testId } });
  if (!testSession || testSession.userId !== session.user.id) notFound();

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  const isLocked = user?.plan === "free";

  const sectionScores = testSession.sectionScores as Record<string, number> | null;
  const aiFeedback = testSession.aiFeedback as AiFeedback | null;

  const task1 = aiFeedback?.task1 ?? null;
  const speakingTasks = aiFeedback?.tasks ?? null;

  const sectionAvg = sectionScores && Object.values(sectionScores).length > 0
    ? Object.values(sectionScores).reduce((a, b) => a + b, 0) / Object.values(sectionScores).length
    : 0;

  const writingAiScore = task1?.overallScore ?? null;
  const speakingAiScore = speakingTasks && speakingTasks.length > 0
    ? speakingTasks.reduce((a, t) => a + t.overallScore, 0) / speakingTasks.length
    : null;

  const overallScore = writingAiScore ?? speakingAiScore ?? (sectionAvg > 0 ? sectionAvg : null);
  const isWritingOrSpeaking = testSession.type === "writing" || testSession.type === "speaking";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Overall score */}
      <div className="text-center mb-10">
        <div className="text-7xl font-mono font-bold text-slate-900 mb-2">
          {overallScore != null && overallScore > 0 ? overallScore.toFixed(1) : "—"}
          <span className="text-3xl text-slate-400">/12</span>
        </div>
        {overallScore != null && overallScore > 0 && (
          <p className="text-xl font-semibold text-blue-600">{clbLabel(overallScore)}</p>
        )}
        <p className="text-slate-500 text-sm mt-1 capitalize">
          {testSession.type} Test · {new Date(testSession.completedAt ?? testSession.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Section scores */}
      {sectionScores && Object.values(sectionScores).length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h2 className="font-semibold text-slate-800 mb-4">Scores</h2>
          {Object.entries(sectionScores).map(([k, v]) => (
            <ScoreBar key={k} label={k.charAt(0).toUpperCase() + k.slice(1)} score={v} />
          ))}
        </div>
      )}

      {/* Writing AI feedback */}
      {task1 && !isLocked && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">AI Feedback — Task 1</h2>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
              Powered by Gemini AI
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {Object.entries(task1.dimensions).map(([key, val]) => (
              <FeedbackCard
                key={key}
                dimension={key.replace(/([A-Z])/g, " $1").trim()}
                score={val.score}
                explanation={val.explanation}
                tip={val.tip}
                locked={false}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="font-semibold text-sm text-green-800 mb-1">💪 Biggest Strength</p>
              <p className="text-sm text-green-700">{task1.strength}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-semibold text-sm text-amber-800 mb-1">📈 Area to Improve</p>
              <p className="text-sm text-amber-700">{task1.improvement}</p>
            </div>
          </div>
          {task1.languageSuggestions?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4">
              <h3 className="font-semibold text-slate-800 mb-3">Language Suggestions</h3>
              {task1.languageSuggestions.map((s, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-3 mb-2">
                  <div className="flex gap-2 mb-1">
                    <span className="text-xs font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Before</span>
                    <span className="text-sm">"{s.original}"</span>
                  </div>
                  <div className="flex gap-2 mb-1">
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">After</span>
                    <span className="text-sm">"{s.improved}"</span>
                  </div>
                  <p className="text-xs text-slate-500">{s.reason}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Speaking AI feedback */}
      {speakingTasks && !isLocked && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">AI Feedback — Speaking</h2>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
              Powered by Gemini AI
            </span>
          </div>
          {speakingTasks.map((t, i) => (
            <div key={i} className="mb-6">
              <h3 className="font-medium text-slate-700 mb-3">Task {i + 1}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {Object.entries(t.dimensions).map(([key, val]) => (
                  <FeedbackCard
                    key={key}
                    dimension={key.replace(/([A-Z])/g, " $1").trim()}
                    score={val.score}
                    explanation={val.explanation}
                    tip={val.tip}
                    locked={false}
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="font-semibold text-sm text-green-800 mb-1">💪 Strength</p>
                  <p className="text-sm text-green-700">{t.strength}</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="font-semibold text-sm text-amber-800 mb-1">📈 Improve</p>
                  <p className="text-sm text-amber-700">{t.improvement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Locked AI feedback */}
      {(task1 || speakingTasks) && isLocked && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center mb-6">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-semibold text-slate-800 mb-1">AI feedback is a paid feature</h3>
          <p className="text-sm text-slate-600 mb-4">Upgrade to see your detailed AI feedback.</p>
          <Link href="/pricing" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 inline-block">
            Upgrade to See Feedback
          </Link>
        </div>
      )}

      {/* AI still processing */}
      {!aiFeedback && isWritingOrSpeaking && !isLocked && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center mb-6">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <h3 className="font-semibold text-slate-800 mb-1">AI feedback is processing</h3>
          <p className="text-sm text-slate-600 mb-3">Refresh this page in 30 seconds to see your detailed feedback.</p>
          <a href="." className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 inline-block">
            Refresh Now
          </a>
        </div>
      )}

      {/* No AI feedback for free plan */}
      {!aiFeedback && isWritingOrSpeaking && isLocked && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center mb-6">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-semibold text-slate-800 mb-1">AI feedback is a paid feature</h3>
          <p className="text-sm text-slate-600 mb-4">Upgrade to Standard to see detailed AI feedback.</p>
          <Link href="/pricing" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 inline-block">
            Upgrade to See Feedback
          </Link>
        </div>
      )}

      {/* What this score means */}
      <details className="bg-white border border-slate-200 rounded-xl mb-6">
        <summary className="px-5 py-4 font-semibold text-slate-800 cursor-pointer">
          What does this score mean?
        </summary>
        <div className="px-5 pb-5 text-sm text-slate-600 space-y-2">
          <p><strong>For Canadian PR (Express Entry):</strong> Most streams require CLB 7 (~7/12 on CELPIP).</p>
          <p><strong>For Citizenship:</strong> CLB 4 is generally required.</p>
          <p><strong>Note:</strong> AI scores are for practice only and may differ from your official CELPIP result.</p>
        </div>
      </details>

      {/* Book real test */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center mb-6">
        <p className="font-semibold text-slate-800 mb-1">Ready to take the real test?</p>
        <p className="text-sm text-slate-600 mb-3">Book your official CELPIP exam at the Paragon Testing website.</p>
        <a href="https://www.celpip.ca" target="_blank" rel="noopener noreferrer"
          className="inline-flex bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700">
          Book Your Real CELPIP Test →
        </a>
      </div>

      <div className="flex gap-3">
        <Link href="/tests" className="flex-1 text-center border border-slate-300 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-50">
          Practice Again
        </Link>
        <Link href="/dashboard" className="flex-1 text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
          Back to Dashboard
        </Link>
      </div>

    </div>
  );
}
