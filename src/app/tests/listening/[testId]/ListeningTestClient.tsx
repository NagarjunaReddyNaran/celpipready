"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TimerBar } from "@/components/ui/TimerBar";
import { AudioPlayer } from "@/components/test/AudioPlayer";
import { LISTENING_QUESTIONS } from "@/lib/questions/listening";

export function ListeningTestClient({ plan }: { plan: string }) {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [initError, setInitError] = useState("");

  const isPremium = plan === "premium";
  const questions = isPremium
    ? LISTENING_QUESTIONS
    : LISTENING_QUESTIONS.filter(q => !q.isPremium);

  const isLast = current === questions.length - 1;
  const q = questions[current];

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
        setInitError("Could not start test. Please refresh and try again.");
      }
    }
    createSession();
  }, [router]);

  const handleNext = async () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    if (isLast) {
      setSubmitting(true);
      const correct = newAnswers.filter((a, i) => a === questions[i].correct).length;
      const score = Math.round((correct / questions.length) * 12 * 10) / 10;

      if (sessionId) {
        await fetch("/api/sessions/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            answers: { responses: newAnswers },
            sectionScores: { listening: score },
          }),
        });
        router.push(`/tests/${sessionId}/results`);
      }
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  if (initError) {
    return (
      <div className="max-w-xl mx-auto px-4 pt-20 text-center">
        <p className="text-red-600 text-sm">{initError}</p>
        <button onClick={() => window.location.reload()} className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700">
          Try Again
        </button>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="max-w-xl mx-auto px-4 pt-20 text-center">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-slate-600 font-medium">Saving your results…</p>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <TimerBar totalSeconds={47 * 60} onExpire={handleNext} />

      <div className="max-w-2xl mx-auto px-4 pt-16 pb-10">

        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
            Question {current + 1} of {questions.length}
          </span>
          {!isPremium && (
            <a href="/pricing" className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-medium hover:bg-amber-100 transition">
              🔒 Premium: +4 harder questions
            </a>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5 mb-6">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i < current ? "bg-blue-600" : i === current ? "bg-blue-300" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Audio player — re-mounts on question change via key */}
        <AudioPlayer
          key={current}
          script={q.ttsScript}
          transcript={q.displayScript}
          context={q.context}
          partNumber={q.part}
        />

        {/* Question */}
        <p className="text-base font-semibold text-slate-800 mb-4">{q.prompt}</p>

        {/* Answer options */}
        <div className="space-y-3 mb-5">
          {q.options.map((opt, i) => {
            let style = "border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer";
            if (showExplanation) {
              if (i === q.correct) style = "border-green-500 bg-green-50 cursor-default";
              else if (selected === i) style = "border-red-400 bg-red-50 cursor-default";
              else style = "border-slate-200 opacity-50 cursor-default";
            } else if (selected === i) {
              style = "border-blue-500 bg-blue-50 cursor-pointer";
            }

            return (
              <button
                key={i}
                onClick={() => !showExplanation && setSelected(i)}
                className={`w-full text-left p-4 rounded-xl border-2 transition text-sm ${style}`}
              >
                <span className="font-mono text-slate-400 mr-3 font-semibold">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
                {showExplanation && i === q.correct && (
                  <span className="ml-2 text-green-600 font-semibold">✓ Correct</span>
                )}
                {showExplanation && selected === i && i !== q.correct && (
                  <span className="ml-2 text-red-500 font-semibold">✗ Your answer</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation box */}
        {showExplanation && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-700 mb-1">Explanation</p>
            {q.explanation}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-between gap-3">
          {selected !== null && !showExplanation && (
            <button
              onClick={() => setShowExplanation(true)}
              className="border border-slate-300 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
            >
              Check Answer
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={selected === null || submitting}
            className="ml-auto bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {isLast ? "Submit Test →" : "Next Question →"}
          </button>
        </div>

      </div>
    </div>
  );
}
