"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TimerBar } from "@/components/ui/TimerBar";

const QUESTIONS = [
  {
    part: 1,
    prompt: "Listen to the conversation between two coworkers. What is the main reason Sarah is stressed?",
    audio: null,
    options: ["She has too many meetings", "Her project deadline was moved earlier", "Her manager gave negative feedback", "She forgot an important task"],
    correct: 1,
    explanation: "Sarah mentions the project deadline was moved up by two weeks."
  },
  {
    part: 2,
    prompt: "Listen to a voicemail from a doctor's office. What should the patient bring to the appointment?",
    audio: null,
    options: ["Only a health card", "Photo ID and insurance card", "Health card and photo ID", "A referral letter"],
    correct: 2,
    explanation: "The receptionist clearly states both health card and photo ID are required."
  },
  {
    part: 3,
    prompt: "Two students are discussing a group project. What do they decide to do first?",
    audio: null,
    options: ["Write the introduction", "Divide the research topics", "Meet with the professor", "Create a presentation outline"],
    correct: 1,
    explanation: "They agree dividing the research topics is the logical first step."
  },
  {
    part: 4,
    prompt: "A radio host interviews a local chef. What inspired the chef to open her restaurant?",
    audio: null,
    options: ["A trip to Italy", "Her grandmother's recipes", "A cooking competition win", "A gap in the local market"],
    correct: 1,
    explanation: "The chef says her grandmother's recipes were the foundation of her menu."
  },
];

export default function ListeningTestPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

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
        console.error("Could not create session");
      }
    }
    createSession();
  }, [router]);

  const isLast = current === QUESTIONS.length - 1;
  const q = QUESTIONS[current];

  const handleNext = async () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    if (isLast) {
      const correct = newAnswers.filter((a, i) => a === QUESTIONS[i].correct).length;
      const score = Math.round((correct / QUESTIONS.length) * 12 * 10) / 10;

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

  return (
    <div className="pt-2">
      <TimerBar totalSeconds={47 * 60} onExpire={handleNext} />
      <div className="max-w-2xl mx-auto px-4 pt-14 pb-8">

        <div className="flex items-center justify-between mb-6">
          <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
            Part {q.part} — Question {current + 1} of {QUESTIONS.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-6">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${
              i < current ? "bg-blue-600" : i === current ? "bg-blue-300" : "bg-slate-200"
            }`} />
          ))}
        </div>

        {/* Audio placeholder */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 text-center">
          <div className="text-4xl mb-2">🎧</div>
          <p className="text-sm text-blue-700 font-medium">
            Audio clip for Part {q.part}
          </p>
          <p className="text-xs text-blue-500 mt-1">
            Real audio files can be added via Cloudinary URLs in the questions array
          </p>
        </div>

        <p className="text-base font-medium text-slate-800 mb-4">{q.prompt}</p>

        <div className="space-y-3 mb-4">
          {q.options.map((opt, i) => {
            let style = "border-slate-200 hover:border-blue-300 hover:bg-blue-50";
            if (selected === i && !showExplanation) style = "border-blue-500 bg-blue-50";
            if (showExplanation && i === q.correct) style = "border-green-500 bg-green-50";
            if (showExplanation && selected === i && i !== q.correct) style = "border-red-400 bg-red-50";
            return (
              <button
                key={i}
                onClick={() => !showExplanation && setSelected(i)}
                className={`w-full text-left p-4 rounded-xl border-2 transition text-sm ${style}`}
              >
                <span className="font-mono text-slate-400 mr-3">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 text-sm text-slate-600">
            <strong>Explanation:</strong> {q.explanation}
          </div>
        )}

        <div className="flex justify-between gap-3">
          {selected !== null && !showExplanation && (
            <button
              onClick={() => setShowExplanation(true)}
              className="border border-slate-300 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50"
            >
              Check Answer
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="ml-auto bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-40"
          >
            {isLast ? "Submit Test" : "Next Question →"}
          </button>
        </div>

      </div>
    </div>
  );
}