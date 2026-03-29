"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TimerBar } from "@/components/ui/TimerBar";
import { AudioPlayer } from "@/components/test/AudioPlayer";
import { LISTENING_PARTS } from "@/lib/questions/listening";

export function ListeningTestClient({ plan }: { plan: string }) {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [initError, setInitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Part/question navigation
  const [partIndex, setPartIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Flat answer array — one entry per question across all parts
  const [allAnswers, setAllAnswers] = useState<number[]>([]);

  const isPremium = plan === "premium";
  const parts = isPremium
    ? LISTENING_PARTS
    : LISTENING_PARTS.filter(p => !p.isPremium);

  // Flat list of all questions for score calculation
  const flatQuestions = parts.flatMap(p => p.questions);
  const totalQuestions = flatQuestions.length;

  // Count how many questions came before the current part
  const questionsBeforeCurrentPart = parts
    .slice(0, partIndex)
    .reduce((sum, p) => sum + p.questions.length, 0);

  const currentPart = parts[partIndex];
  const currentQ = currentPart?.questions[qIndex];
  const isLastQInPart = qIndex === currentPart?.questions.length - 1;
  const isLastPart = partIndex === parts.length - 1;
  const overallQuestionNumber = questionsBeforeCurrentPart + qIndex + 1;

  useEffect(() => {
    async function createSession() {
      try {
        const res = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "listening" }),
        });
        const data = await res.json();
        if (data.limitReached) { router.push("/pricing"); return; }
        if (data.sessionId) setSessionId(data.sessionId);
      } catch {
        setInitError("Could not start the test. Please refresh and try again.");
      }
    }
    createSession();
  }, [router]);

  const handleNext = async () => {
    if (selected === null) return;

    const updatedAnswers = [...allAnswers, selected];
    setAllAnswers(updatedAnswers);

    if (isLastQInPart && isLastPart) {
      // ── Submit test ──────────────────────────────────────────
      setSubmitting(true);
      const correct = updatedAnswers.filter((a, i) => a === flatQuestions[i].correct).length;
      const score = Math.round((correct / totalQuestions) * 12 * 10) / 10;

      if (sessionId) {
        await fetch("/api/sessions/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            answers: { responses: updatedAnswers },
            sectionScores: { listening: score },
          }),
        });
        router.push(`/tests/${sessionId}/results`);
      }
    } else if (isLastQInPart) {
      // ── Move to next part ────────────────────────────────────
      setPartIndex(p => p + 1);
      setQIndex(0);
      setSelected(null);
      setShowExplanation(false);
    } else {
      // ── Next question in same part ───────────────────────────
      setQIndex(q => q + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  // ── Loading / error states ───────────────────────────────────────────────────

  if (initError) {
    return (
      <div className="max-w-xl mx-auto px-4 pt-20 text-center">
        <p className="text-red-600 text-sm mb-4">{initError}</p>
        <button onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700">
          Try Again
        </button>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="max-w-xl mx-auto px-4 pt-20 text-center">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-slate-600 font-medium">Calculating your score…</p>
      </div>
    );
  }

  // ── Main test UI ─────────────────────────────────────────────────────────────

  return (
    <div className="pt-2">
      <TimerBar totalSeconds={47 * 60} onExpire={handleNext} />

      <div className="max-w-2xl mx-auto px-4 pt-16 pb-12">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
              Part {currentPart.part} of {parts.length}
            </span>
            <span className="text-sm text-slate-500">
              Q{overallQuestionNumber}/{totalQuestions}
            </span>
          </div>
          {!isPremium && (
            <a href="/pricing"
              className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-medium hover:bg-amber-100 transition">
              🔒 Upgrade for Parts 5–8
            </a>
          )}
        </div>

        {/* Overall progress bar */}
        <div className="flex gap-0.5 mb-6">
          {flatQuestions.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${
              i < allAnswers.length ? "bg-blue-600"
              : i === allAnswers.length ? "bg-blue-300"
              : "bg-slate-200"
            }`} />
          ))}
        </div>

        {/* Part title */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">{currentPart.title}</h2>
          {qIndex === 0 && (
            <p className="text-sm text-slate-500 mt-1">
              {currentPart.questions.length} question{currentPart.questions.length > 1 ? "s" : ""} about this audio
            </p>
          )}
        </div>

        {/* Audio Player — key resets only when part changes */}
        <AudioPlayer
          key={partIndex}
          script={currentPart.ttsScript}
          transcript={currentPart.displayScript}
          context={currentPart.context}
          partNumber={currentPart.part}
        />

        {/* Question number within part */}
        <p className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wide">
          Question {qIndex + 1} of {currentPart.questions.length} for this audio
        </p>

        {/* Question prompt */}
        <p className="text-base font-semibold text-slate-800 mb-4">{currentQ.prompt}</p>

        {/* Answer options */}
        <div className="space-y-3 mb-5">
          {currentQ.options.map((opt, i) => {
            let style = "border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer";
            if (showExplanation) {
              if (i === currentQ.correct) style = "border-green-500 bg-green-50 cursor-default";
              else if (selected === i) style = "border-red-400 bg-red-50 cursor-default";
              else style = "border-slate-200 opacity-40 cursor-default";
            } else if (selected === i) {
              style = "border-blue-500 bg-blue-50";
            }
            return (
              <button
                key={i}
                onClick={() => !showExplanation && setSelected(i)}
                className={`w-full text-left p-4 rounded-xl border-2 transition text-sm ${style}`}
              >
                <span className="font-mono font-semibold text-slate-400 mr-3">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
                {showExplanation && i === currentQ.correct && (
                  <span className="ml-2 text-green-600 font-semibold text-xs">✓ Correct</span>
                )}
                {showExplanation && selected === i && i !== currentQ.correct && (
                  <span className="ml-2 text-red-500 font-semibold text-xs">✗ Your answer</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-700 mb-1">Explanation</p>
            {currentQ.explanation}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-between gap-3">
          {selected !== null && !showExplanation && (
            <button onClick={() => setShowExplanation(true)}
              className="border border-slate-300 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition">
              Check Answer
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={selected === null || submitting}
            className="ml-auto bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {isLastQInPart && isLastPart
              ? "Submit Test →"
              : isLastQInPart
              ? `Next Part (${parts[partIndex + 1]?.title}) →`
              : "Next Question →"}
          </button>
        </div>

      </div>
    </div>
  );
}
