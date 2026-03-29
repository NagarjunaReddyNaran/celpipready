"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TimerBar } from "@/components/ui/TimerBar";
import { READING_SETS, ReadingSet, ReadingPart } from "@/lib/questions/reading";

// Total questions across all parts
const TOTAL_QUESTIONS = 38;

// Flat map helper: map part index + question index → global question index
function getGlobalIndex(set: ReadingSet, partIndex: number, qIndex: number): number {
  let offset = 0;
  for (let i = 0; i < partIndex; i++) {
    offset += set.parts[i].questions.length;
  }
  return offset + qIndex;
}

export default function ReadingTestPage() {
  const router = useRouter();

  // Resolve the reading set (always mock-a for now)
  const set: ReadingSet = READING_SETS.find((s) => s.id === "mock-a") ?? READING_SETS[0];

  // Session state
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Navigation state
  const [partIndex, setPartIndex] = useState(0);       // 0–3
  const [qIndex, setQIndex] = useState(0);             // index within current part
  const [selected, setSelected] = useState<number | null>(null);

  // All answers: flat array indexed by global question index
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(TOTAL_QUESTIONS).fill(null)
  );

  // Mobile tab toggle: "passage" | "questions"
  const [mobileTab, setMobileTab] = useState<"passage" | "questions">("passage");

  // Create session on mount
  useEffect(() => {
    async function createSession() {
      try {
        const res = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "reading" }),
        });
        const data: { limitReached?: boolean; sessionId?: string } = await res.json();
        if (data.limitReached) {
          router.push("/pricing");
          return;
        }
        if (data.sessionId) setSessionId(data.sessionId);
      } catch {
        console.error("Could not create session");
      }
    }
    createSession();
  }, [router]);

  // Derived values
  const currentPart: ReadingPart = set.parts[partIndex];
  const currentQ = currentPart.questions[qIndex];
  const isLastQInPart = qIndex === currentPart.questions.length - 1;
  const isLastPart = partIndex === set.parts.length - 1;
  const globalIndex = getGlobalIndex(set, partIndex, qIndex);

  // Count answered questions for progress bar
  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPct = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  // Restore selected answer when navigating (if already answered)
  useEffect(() => {
    const prev = answers[globalIndex];
    setSelected(prev !== null && prev !== undefined ? prev : null);
  }, [partIndex, qIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleConfirm = () => {
    if (selected === null) return;

    // Save answer
    const newAnswers = [...answers];
    newAnswers[globalIndex] = selected;
    setAnswers(newAnswers);

    if (!isLastQInPart) {
      // Move to next question in this part
      setQIndex((q) => q + 1);
      setMobileTab("questions"); // keep questions tab active after first answer
    }
    // If last question in part, the "Next Part / Submit" button appears — handled separately
  };

  const handleNextPart = async () => {
    // Ensure the last answer in the part is saved
    if (selected !== null) {
      const newAnswers = [...answers];
      newAnswers[globalIndex] = selected;
      setAnswers(newAnswers);

      if (!isLastPart) {
        setPartIndex((p) => p + 1);
        setQIndex(0);
        setSelected(null);
        setMobileTab("passage"); // show passage of new part first on mobile
      } else {
        // Submit
        await submitTest(newAnswers);
      }
    }
  };

  const submitTest = async (finalAnswers: (number | null)[]) => {
    // Calculate score: correct / 38 * 12
    let correctCount = 0;
    let globalIdx = 0;
    for (let pi = 0; pi < set.parts.length; pi++) {
      for (let qi = 0; qi < set.parts[pi].questions.length; qi++) {
        if (finalAnswers[globalIdx] === set.parts[pi].questions[qi].correct) {
          correctCount++;
        }
        globalIdx++;
      }
    }
    const score = Math.round((correctCount / TOTAL_QUESTIONS) * 12 * 10) / 10;

    if (sessionId) {
      try {
        await fetch("/api/sessions/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            answers: { responses: finalAnswers },
            sectionScores: { reading: score },
          }),
        });
      } catch {
        console.error("Could not complete session");
      }
      router.push(`/tests/${sessionId}/results`);
    }
  };

  // Timer expiry: auto-submit with whatever answers exist
  const handleExpire = async () => {
    await submitTest(answers);
  };

  // Whether the current part is fully answered (all questions have an answer)
  const isCurrentPartComplete = currentPart.questions.every((_, qi) => {
    const gi = getGlobalIndex(set, partIndex, qi);
    return answers[gi] !== null;
  });

  // Show the "Next Part / Submit" button only when all questions in the part are answered
  // and we are on the last question of the part
  const showPartNavButton = isLastQInPart && isCurrentPartComplete;

  return (
    <div className="pt-2">
      {/* Single timer for all 4 parts combined */}
      <TimerBar totalSeconds={55 * 60} onExpire={handleExpire} />

      <div className="pt-12">
        {/* Part indicator + overall progress */}
        <div className="px-4 py-3 border-b border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Part {currentPart.part} of 4 —{" "}
              </span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {currentPart.partTitle}
              </span>
            </div>
            <div className="flex items-center gap-3 min-w-[180px]">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {answeredCount} / {TOTAL_QUESTIONS}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile tab toggle */}
        <div className="lg:hidden flex border-b border-slate-200 bg-white">
          <button
            onClick={() => setMobileTab("passage")}
            className={`flex-1 py-2.5 text-sm font-medium transition ${
              mobileTab === "passage"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500"
            }`}
          >
            Show Passage
          </button>
          <button
            onClick={() => setMobileTab("questions")}
            className={`flex-1 py-2.5 text-sm font-medium transition ${
              mobileTab === "questions"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500"
            }`}
          >
            Show Questions
          </button>
        </div>

        {/* Split-screen layout */}
        <div
          className="flex flex-col lg:grid lg:grid-cols-2"
          style={{ height: "calc(100vh - 120px)" }}
        >
          {/* Passage panel — fixed for the entire part */}
          <div
            className={`overflow-y-auto border-b lg:border-b-0 lg:border-r border-slate-200 p-5 lg:p-6 ${
              mobileTab === "questions" ? "hidden lg:block" : "block"
            }`}
          >
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Reading Passage
            </div>
            <div className="text-sm font-semibold text-slate-700 mb-3">
              {currentPart.passageTitle}
            </div>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white rounded-xl border border-slate-100 p-5">
              {currentPart.passageText}
            </div>
          </div>

          {/* Questions panel */}
          <div
            className={`overflow-y-auto p-5 lg:p-6 ${
              mobileTab === "passage" ? "hidden lg:block" : "block"
            }`}
          >
            {/* Question counter + part progress dots */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Questions
              </span>
              <span className="text-sm text-slate-500">
                {qIndex + 1} of {currentPart.questions.length}
              </span>
            </div>

            {/* Part progress dots */}
            <div className="flex gap-1.5 mb-5">
              {currentPart.questions.map((_, i) => {
                const gi = getGlobalIndex(set, partIndex, i);
                const isAnswered = answers[gi] !== null;
                const isCurrent = i === qIndex;
                return (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      isAnswered
                        ? "bg-blue-600"
                        : isCurrent
                        ? "bg-blue-300"
                        : "bg-slate-200"
                    }`}
                  />
                );
              })}
            </div>

            {/* Question text */}
            <p className="text-base font-medium text-slate-800 mb-4">
              {currentQ.q}
            </p>

            {/* Answer options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition text-sm ${
                    selected === i
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <span className="font-mono text-slate-400 mr-3">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            {showPartNavButton ? (
              <button
                onClick={handleNextPart}
                disabled={selected === null}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 transition"
              >
                {isLastPart ? "Submit Test" : `Next Part →`}
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={selected === null}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 transition"
              >
                {isLastQInPart ? "Review & Continue" : "Next Question →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
