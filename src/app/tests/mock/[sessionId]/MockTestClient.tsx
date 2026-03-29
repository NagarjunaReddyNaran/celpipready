"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TimerBar } from "@/components/ui/TimerBar";
import { AudioPlayer } from "@/components/test/AudioPlayer";
import { LISTENING_PARTS } from "@/lib/questions/listening";
import { READING_SETS } from "@/lib/questions/reading";
import { WRITING_SETS } from "@/lib/questions/writing";
import { SPEAKING_SETS } from "@/lib/questions/speaking";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type MockSet = "mock-a" | "mock-b";

type TestSection =
  | "intro"
  | "listening"
  | "break-1"
  | "reading"
  | "break-2"
  | "writing"
  | "break-3"
  | "speaking"
  | "submitting";

interface RecordingEntry {
  prompt: string;
  audioUrl: string;
}

interface TestState {
  // Listening
  listeningAnswers: number[];
  listeningScore: number | null;
  // Reading
  readingAnswers: (number | null)[];
  readingScore: number | null;
  // Writing
  writingTask1: string;
  writingTask2: string;
  // Speaking
  speakingRecordings: RecordingEntry[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const SECTION_LABELS: Record<string, string> = {
  listening: "Listening",
  reading: "Reading",
  writing: "Writing",
  speaking: "Speaking",
};

const NEXT_SECTION: Record<TestSection, TestSection> = {
  intro: "listening",
  listening: "break-1",
  "break-1": "reading",
  reading: "break-2",
  "break-2": "writing",
  writing: "break-3",
  "break-3": "speaking",
  speaking: "submitting",
  submitting: "submitting",
};

const BREAK_NEXT_LABEL: Record<string, string> = {
  "break-1": "Reading",
  "break-2": "Writing",
  "break-3": "Speaking",
};

// ─────────────────────────────────────────────────────────────────────────────
// Word count helper
// ─────────────────────────────────────────────────────────────────────────────

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ─────────────────────────────────────────────────────────────────────────────
// Reading: global index helper
// ─────────────────────────────────────────────────────────────────────────────

function readingGlobalIndex(
  partLengths: number[],
  partIndex: number,
  qIndex: number
): number {
  let offset = 0;
  for (let i = 0; i < partIndex; i++) offset += partLengths[i];
  return offset + qIndex;
}

// ─────────────────────────────────────────────────────────────────────────────
// MockTestClient
// ─────────────────────────────────────────────────────────────────────────────

export function MockTestClient({
  sessionId,
  mockSet,
  plan: _plan,
}: {
  sessionId: string;
  mockSet: MockSet;
  plan: string;
}) {
  const router = useRouter();

  // ── Section state machine ─────────────────────────────────────────────────
  const [section, setSection] = useState<TestSection>("intro");

  // ── Accumulated test answers ──────────────────────────────────────────────
  const [testState, setTestState] = useState<TestState>({
    listeningAnswers: [],
    listeningScore: null,
    readingAnswers: Array(38).fill(null),
    readingScore: null,
    writingTask1: "",
    writingTask2: "",
    speakingRecordings: [],
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Warn on accidental navigation
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (section !== "intro" && section !== "submitting") {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [section]);

  // ─────────────────────────────────────────────────────────────────────────
  // Submit all answers to API
  // ─────────────────────────────────────────────────────────────────────────
  const submitAll = useCallback(
    async (finalState: TestState) => {
      setSection("submitting");

      try {
        await fetch("/api/sessions/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            answers: {
              mockSet,
              listening: { responses: finalState.listeningAnswers },
              reading: { responses: finalState.readingAnswers },
              writing: {
                task1: finalState.writingTask1,
                task2: finalState.writingTask2,
              },
              speaking: { recordings: finalState.speakingRecordings },
            },
            sectionScores: {
              listening: finalState.listeningScore,
              reading: finalState.readingScore,
            },
          }),
        });

        router.push(`/tests/${sessionId}/results`);
      } catch {
        // Non-fatal: still redirect to results
        router.push(`/tests/${sessionId}/results`);
      }
    },
    [sessionId, mockSet, router]
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Section renderers
  // ─────────────────────────────────────────────────────────────────────────

  if (section === "intro") {
    return (
      <IntroScreen
        onStart={() => setSection("listening")}
      />
    );
  }

  if (section === "listening") {
    return (
      <ListeningSection
        onComplete={(answers, score) => {
          setTestState((s) => ({
            ...s,
            listeningAnswers: answers,
            listeningScore: score,
          }));
          setSection("break-1");
        }}
      />
    );
  }

  if (section === "break-1" || section === "break-2" || section === "break-3") {
    return (
      <BreakScreen
        breakKey={section}
        nextLabel={BREAK_NEXT_LABEL[section]}
        onContinue={() => setSection(NEXT_SECTION[section])}
      />
    );
  }

  if (section === "reading") {
    return (
      <ReadingSection
        mockSet={mockSet}
        onComplete={(answers, score) => {
          setTestState((s) => ({
            ...s,
            readingAnswers: answers,
            readingScore: score,
          }));
          setSection("break-2");
        }}
      />
    );
  }

  if (section === "writing") {
    return (
      <WritingSection
        mockSet={mockSet}
        onComplete={(task1, task2) => {
          setTestState((s) => ({ ...s, writingTask1: task1, writingTask2: task2 }));
          setSection("break-3");
        }}
      />
    );
  }

  if (section === "speaking") {
    return (
      <SpeakingSection
        mockSet={mockSet}
        onComplete={(recordings) => {
          const finalState: TestState = {
            ...testState,
            speakingRecordings: recordings,
          };
          setTestState(finalState);
          submitAll(finalState);
        }}
      />
    );
  }

  // submitting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-slate-800">
          Calculating your results…
        </h2>
        <p className="text-slate-500 text-sm mt-1">This only takes a moment.</p>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// INTRO SCREEN
// ═════════════════════════════════════════════════════════════════════════════

function IntroScreen({ onStart }: { onStart: () => void }) {
  const STRUCTURE = [
    { section: "Listening", icon: "🎧", questions: 44, time: "~47 min" },
    { section: "Reading",   icon: "📖", questions: 38, time: "~55 min" },
    { section: "Writing",   icon: "✍️", questions: 2, time: "~53 min" },
    { section: "Speaking",  icon: "🎙️", questions: 8, time: "~20 min" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4">🏆</div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Full Mock Test</h1>
      <p className="text-slate-500 mb-8">
        Ready to begin? The clock starts when you click Start Listening.
      </p>

      {/* Test structure table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 text-left">
        <h2 className="font-semibold text-slate-800 mb-4">Test Structure</h2>
        <div className="space-y-2">
          {STRUCTURE.map((s) => (
            <div
              key={s.section}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <span className="font-medium text-slate-800">{s.section}</span>
                  <span className="ml-2 text-xs text-slate-400">
                    {s.questions} question{s.questions !== 1 ? "s" : ""}
                  </span>
                </div>
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

      <button
        onClick={onStart}
        className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-blue-700 transition"
      >
        Start Test →
      </button>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// BREAK SCREEN
// ═════════════════════════════════════════════════════════════════════════════

function BreakScreen({
  breakKey,
  nextLabel,
  onContinue,
}: {
  breakKey: string;
  nextLabel: string;
  onContinue: () => void;
}) {
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (countdown <= 0) { onContinue(); return; }
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [started, countdown, onContinue]);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  // Use breakKey to distinguish completed section label
  const completedLabels: Record<string, string> = {
    "break-1": SECTION_LABELS.listening,
    "break-2": SECTION_LABELS.reading,
    "break-3": SECTION_LABELS.writing,
  };
  const completedLabel = completedLabels[breakKey] ?? "Section";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {completedLabel} Complete!
        </h2>
        <p className="text-slate-500 mb-8">
          Take a 2-minute break before the <strong>{nextLabel}</strong> section.
          You can continue whenever you&apos;re ready.
        </p>

        {started && countdown > 0 && (
          <div className="mb-6">
            <div className="text-4xl font-mono font-bold text-blue-600 mb-2">
              {fmt(countdown)}
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(countdown / 120) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={onContinue}
            className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Continue to {nextLabel} →
          </button>
          {!started && (
            <button
              onClick={() => setStarted(true)}
              className="text-slate-500 text-sm hover:text-slate-700 underline"
            >
              Start 2-minute countdown
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// LISTENING SECTION
// ═════════════════════════════════════════════════════════════════════════════

function ListeningSection({
  onComplete,
}: {
  onComplete: (answers: number[], score: number) => void;
}) {
  // Use ALL parts (free + premium) for the full mock
  const parts = LISTENING_PARTS;
  const flatQuestions = parts.flatMap((p) => p.questions);
  const totalQuestions = flatQuestions.length;

  const [partIndex, setPartIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [allAnswers, setAllAnswers] = useState<number[]>([]);

  const currentPart = parts[partIndex];
  const currentQ = currentPart?.questions[qIndex];
  const isLastQInPart = qIndex === currentPart?.questions.length - 1;
  const isLastPart = partIndex === parts.length - 1;

  const questionsBeforeCurrentPart = parts
    .slice(0, partIndex)
    .reduce((sum, p) => sum + p.questions.length, 0);
  const overallQNumber = questionsBeforeCurrentPart + qIndex + 1;

  const handleNext = () => {
    if (selected === null) return;

    const updatedAnswers = [...allAnswers, selected];
    setAllAnswers(updatedAnswers);

    if (isLastQInPart && isLastPart) {
      // Done — calculate score and notify parent
      const correct = updatedAnswers.filter(
        (a, i) => a === flatQuestions[i].correct
      ).length;
      const score = Math.round((correct / totalQuestions) * 12 * 10) / 10;
      onComplete(updatedAnswers, score);
    } else if (isLastQInPart) {
      setPartIndex((p) => p + 1);
      setQIndex(0);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setQIndex((q) => q + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  // Timer expiry: auto-advance with current answer (or 0 if none)
  const handleExpire = () => {
    const ans = selected ?? 0;
    const updatedAnswers = [...allAnswers, ans];
    const correct = updatedAnswers.filter(
      (a, i) => a === flatQuestions[i]?.correct
    ).length;
    const score = Math.round((correct / totalQuestions) * 12 * 10) / 10;
    onComplete(updatedAnswers, score);
  };

  return (
    <div className="pt-2">
      <TimerBar totalSeconds={47 * 60} onExpire={handleExpire} />

      <div className="max-w-2xl mx-auto px-4 pt-16 pb-12">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
              Part {currentPart.part} of {parts.length}
            </span>
            <span className="text-sm text-slate-500">
              Q{overallQNumber}/{totalQuestions}
            </span>
          </div>
          <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
            🎧 Listening
          </span>
        </div>

        {/* Overall progress bar */}
        <div className="flex gap-0.5 mb-6">
          {flatQuestions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i < allAnswers.length
                  ? "bg-blue-600"
                  : i === allAnswers.length
                  ? "bg-blue-300"
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Part title */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">{currentPart.title}</h2>
          {qIndex === 0 && (
            <p className="text-sm text-slate-500 mt-1">
              {currentPart.questions.length} question
              {currentPart.questions.length > 1 ? "s" : ""} about this audio
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
        <p className="text-base font-semibold text-slate-800 mb-4">
          {currentQ.prompt}
        </p>

        {/* Answer options */}
        <div className="space-y-3 mb-5">
          {currentQ.options.map((opt, i) => {
            let style =
              "border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer";
            if (showExplanation) {
              if (i === currentQ.correct)
                style = "border-green-500 bg-green-50 cursor-default";
              else if (selected === i)
                style = "border-red-400 bg-red-50 cursor-default";
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
                  <span className="ml-2 text-green-600 font-semibold text-xs">
                    ✓ Correct
                  </span>
                )}
                {showExplanation && selected === i && i !== currentQ.correct && (
                  <span className="ml-2 text-red-500 font-semibold text-xs">
                    ✗ Your answer
                  </span>
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
            <button
              onClick={() => setShowExplanation(true)}
              className="border border-slate-300 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
            >
              Check Answer
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="ml-auto bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {isLastQInPart && isLastPart
              ? "Finish Listening →"
              : isLastQInPart
              ? `Next Part (${parts[partIndex + 1]?.title}) →`
              : "Next Question →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// READING SECTION
// ═════════════════════════════════════════════════════════════════════════════

function ReadingSection({
  mockSet,
  onComplete,
}: {
  mockSet: MockSet;
  onComplete: (answers: (number | null)[], score: number) => void;
}) {
  const readingSet = READING_SETS.find((s) => s.id === mockSet) ?? READING_SETS[0];
  const TOTAL_QUESTIONS = 38;

  const [partIndex, setPartIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(TOTAL_QUESTIONS).fill(null)
  );
  const [mobileTab, setMobileTab] = useState<"passage" | "questions">("passage");

  const partLengths = readingSet.parts.map((p) => p.questions.length);
  const currentPart = readingSet.parts[partIndex];
  const currentQ = currentPart.questions[qIndex];
  const isLastQInPart = qIndex === currentPart.questions.length - 1;
  const isLastPart = partIndex === readingSet.parts.length - 1;
  const globalIndex = readingGlobalIndex(partLengths, partIndex, qIndex);

  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPct = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  // Restore previously selected answer when navigating
  useEffect(() => {
    const prev = answers[globalIndex];
    setSelected(prev !== null && prev !== undefined ? prev : null);
  }, [partIndex, qIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const submitReading = (finalAnswers: (number | null)[]) => {
    let correct = 0;
    let gi = 0;
    for (let pi = 0; pi < readingSet.parts.length; pi++) {
      for (let qi2 = 0; qi2 < readingSet.parts[pi].questions.length; qi2++) {
        if (finalAnswers[gi] === readingSet.parts[pi].questions[qi2].correct) {
          correct++;
        }
        gi++;
      }
    }
    const score = Math.round((correct / TOTAL_QUESTIONS) * 12 * 10) / 10;
    onComplete(finalAnswers, score);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[globalIndex] = selected;
    setAnswers(newAnswers);

    if (!isLastQInPart) {
      setQIndex((q) => q + 1);
      setMobileTab("questions");
    }
  };

  const handleNextPart = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[globalIndex] = selected;
    setAnswers(newAnswers);

    if (!isLastPart) {
      setPartIndex((p) => p + 1);
      setQIndex(0);
      setSelected(null);
      setMobileTab("passage");
    } else {
      submitReading(newAnswers);
    }
  };

  const isCurrentPartComplete = currentPart.questions.every((_, qi2) => {
    const gi = readingGlobalIndex(partLengths, partIndex, qi2);
    return answers[gi] !== null;
  });
  const showPartNavButton = isLastQInPart && isCurrentPartComplete;

  return (
    <div className="pt-2">
      <TimerBar totalSeconds={55 * 60} onExpire={() => submitReading(answers)} />

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
          {/* Passage panel */}
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
                const gi = readingGlobalIndex(partLengths, partIndex, i);
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

            <p className="text-base font-medium text-slate-800 mb-4">{currentQ.q}</p>

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

            {showPartNavButton ? (
              <button
                onClick={handleNextPart}
                disabled={selected === null}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 transition"
              >
                {isLastPart ? "Finish Reading →" : "Next Part →"}
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

// ═════════════════════════════════════════════════════════════════════════════
// WRITING SECTION
// ═════════════════════════════════════════════════════════════════════════════

function WritingSection({
  mockSet,
  onComplete,
}: {
  mockSet: MockSet;
  onComplete: (task1: string, task2: string) => void;
}) {
  const writingSet = WRITING_SETS.find((s) => s.id === mockSet) ?? WRITING_SETS[0];
  const [phase, setPhase] = useState<"task1" | "task2">("task1");
  const [task1, setTask1] = useState("");
  const [task2, setTask2] = useState("");

  const currentPrompt = phase === "task1" ? writingSet.task1 : writingSet.task2;
  const currentText = phase === "task1" ? task1 : task2;
  const setCurrentText = phase === "task1" ? setTask1 : setTask2;
  const wordCount = countWords(currentText);
  const wordMin = currentPrompt.wordMin;
  const wordMax = currentPrompt.wordMax;

  const isUnder = wordCount < wordMin;
  const isOver = wordCount > wordMax;

  const handleTimerExpire = () => {
    if (phase === "task1") {
      setPhase("task2");
    } else {
      onComplete(task1, task2);
    }
  };

  return (
    <div className="pt-2">
      <TimerBar
        key={phase} // reset timer when phase changes
        totalSeconds={currentPrompt.timeSeconds}
        onExpire={handleTimerExpire}
      />

      <div className="max-w-3xl mx-auto px-4 pt-14 pb-8">
        {/* Section header */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
            {phase === "task1" ? "Task 1 of 2" : "Task 2 of 2"}
          </span>
          <span>{currentPrompt.title}</span>
          <span className="text-slate-400">·</span>
          <span>{Math.floor(currentPrompt.timeSeconds / 60)} min</span>
        </div>

        {/* Situation */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-3">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
            Situation
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {currentPrompt.situation}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Instructions
          </p>
          <ul className="space-y-1.5">
            {currentPrompt.instructions.map((instr, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="font-bold text-blue-600 mt-0.5 shrink-0">{i + 1}.</span>
                {instr}
              </li>
            ))}
          </ul>
        </div>

        {/* Inline writing editor */}
        <div className="relative">
          <textarea
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            placeholder="Start writing here…"
            className="w-full min-h-[260px] border-2 border-slate-200 rounded-xl p-4 text-sm text-slate-800 leading-relaxed resize-y focus:outline-none focus:border-blue-400 transition"
          />
          {/* Word count bar */}
          <div className="flex items-center justify-between mt-2 px-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold ${
                  isOver
                    ? "text-red-600"
                    : isUnder
                    ? "text-amber-600"
                    : "text-green-600"
                }`}
              >
                {wordCount} words
              </span>
              <span className="text-xs text-slate-400">
                (target: {wordMin}–{wordMax})
              </span>
            </div>
            {isOver && (
              <span className="text-xs text-red-600 font-medium">
                ⚠ Over word limit
              </span>
            )}
            {isUnder && wordCount > 0 && (
              <span className="text-xs text-amber-600 font-medium">
                {wordMin - wordCount} words to go
              </span>
            )}
          </div>
          {/* Word count progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div
              className={`h-full rounded-full transition-all ${
                isOver ? "bg-red-500" : isUnder ? "bg-amber-400" : "bg-green-500"
              }`}
              style={{
                width: `${Math.min(100, (wordCount / wordMax) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end mt-5">
          {phase === "task1" ? (
            <button
              onClick={() => setPhase("task2")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Submit Task 1 &amp; Continue →
            </button>
          ) : (
            <button
              onClick={() => onComplete(task1, task2)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Finish Writing →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SPEAKING SECTION
// ═════════════════════════════════════════════════════════════════════════════

type SpeakingPhase = "prep-idle" | "prep-counting" | "record" | "uploading";

function SpeakingSection({
  mockSet,
  onComplete,
}: {
  mockSet: MockSet;
  onComplete: (recordings: RecordingEntry[]) => void;
}) {
  const speakingSet = SPEAKING_SETS.find((s) => s.id === mockSet) ?? SPEAKING_SETS[0];
  const tasks = speakingSet.tasks;

  const [taskIndex, setTaskIndex] = useState(0);
  const [phase, setPhase] = useState<SpeakingPhase>("prep-idle");
  const [prepCountdown, setPrepCountdown] = useState(30);
  const [recordings, setRecordings] = useState<RecordingEntry[]>([]);
  const [error, setError] = useState("");

  // MediaRecorder refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [recRemaining, setRecRemaining] = useState(0);

  const currentTask = tasks[taskIndex];

  // ── Prep countdown ──────────────────────────────────────────────────────────
  const startPrep = () => {
    setPrepCountdown(30);
    setPhase("prep-counting");
  };

  useEffect(() => {
    if (phase !== "prep-counting") return;
    if (prepCountdown <= 0) {
      startRecording();
      return;
    }
    const t = setTimeout(() => setPrepCountdown((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }); // run on every render to track countdown changes

  // ── Start recording ─────────────────────────────────────────────────────────
  const startRecording = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        handleRecordingStop();
      };
      rec.start();
      mediaRecorderRef.current = rec;

      const maxSec = currentTask.recordSeconds;
      setRecRemaining(maxSec);
      setPhase("record");

      // Auto-stop timer
      recordTimerRef.current = setInterval(() => {
        setRecRemaining((r) => {
          if (r <= 1) {
            stopRecording();
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    } catch {
      setError("Could not access microphone. Please check permissions and try again.");
      setPhase("prep-idle");
    }
  };

  const stopRecording = () => {
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    mediaRecorderRef.current?.stop();
  };

  // ── Handle stop ─────────────────────────────────────────────────────────────
  const handleRecordingStop = async () => {
    setPhase("uploading");
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });

    let audioUrl = "placeholder://recording";
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      const res = await fetch("/api/upload-audio", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        audioUrl = data.url ?? audioUrl;
      }
    } catch {
      // Upload failed — use placeholder so we can still continue
    }

    const newRecording: RecordingEntry = {
      prompt: currentTask.prompt,
      audioUrl,
    };
    const newRecordings = [...recordings, newRecording];
    setRecordings(newRecordings);

    if (taskIndex < tasks.length - 1) {
      // Next task
      setTaskIndex((i) => i + 1);
      setPrepCountdown(30);
      setPhase("prep-idle");
    } else {
      // All done
      onComplete(newRecordings);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  const fmtTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-900">Speaking</h1>
        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Task {taskIndex + 1} of {tasks.length}
        </span>
      </div>

      {/* Overall progress */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(taskIndex / tasks.length) * 100}%` }}
        />
      </div>

      {/* Task type badge */}
      <div className="mb-3">
        <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium capitalize">
          {currentTask.title}
        </span>
      </div>

      {/* Task prompt */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5">
        <p className="text-sm text-slate-700 leading-relaxed">{currentTask.prompt}</p>
        {currentTask.imageAlt && (
          <div className="mt-3 p-3 bg-white border border-amber-100 rounded-lg">
            <p className="text-xs text-slate-400 italic">[Image: {currentTask.imageAlt}]</p>
          </div>
        )}
      </div>

      {/* Tips */}
      {currentTask.tips && currentTask.tips.length > 0 && phase === "prep-idle" && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Tips</p>
          <ul className="space-y-1">
            {currentTask.tips.map((tip, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Phase: prep-idle */}
      {phase === "prep-idle" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <p className="text-slate-500 text-sm mb-4">
            Read the task above, then click to start your 30-second preparation time.
          </p>
          <button
            onClick={startPrep}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Start Preparation (30s)
          </button>
        </div>
      )}

      {/* Phase: prep-counting */}
      {phase === "prep-counting" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <p className="text-slate-500 text-sm mb-2">Preparation time</p>
          <div className="text-6xl font-mono font-bold text-blue-600 mb-4">
            {prepCountdown}
          </div>
          <p className="text-sm text-slate-400">Recording will start automatically</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(prepCountdown / 30) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Phase: record */}
      {phase === "record" && (
        <div className="bg-slate-50 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-1 mb-3">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
              Recording
            </span>
          </div>
          <div className="text-4xl font-mono font-bold text-red-600 mb-4">
            {fmtTime(recRemaining)}
          </div>
          <button
            onClick={stopRecording}
            className="bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-900 transition"
          >
            Stop &amp; Submit
          </button>
        </div>
      )}

      {/* Phase: uploading */}
      {phase === "uploading" && (
        <div className="bg-slate-50 rounded-xl p-6 text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Saving recording…</p>
        </div>
      )}
    </div>
  );
}
