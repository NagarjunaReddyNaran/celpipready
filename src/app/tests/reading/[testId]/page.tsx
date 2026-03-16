"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TimerBar } from "@/components/ui/TimerBar";

const PASSAGE = `Subject: Community Garden Project Update

Dear Residents,

I am writing to update you on the progress of the Maple Street Community Garden project. After months of planning, we are pleased to announce that construction will begin on April 1st.

The garden will feature 40 individual plots available for annual rental at $50 per season. Priority will be given to residents who applied during the initial sign-up period last November. Remaining plots will be allocated on a first-come, first-served basis starting March 15th.

Each plot measures 4 by 8 feet and includes access to shared tools, a compost station, and a water supply. Renters are responsible for maintaining their plots and must agree to the Garden Charter, which prohibits pesticide use and requires plots to be kept tidy.

A volunteer orientation session will be held on March 20th at 10 AM in the Community Hall. Attendance is strongly encouraged for all new renters.

Please contact the Community Office at garden@maplestreet.ca or call 555-0192 with any questions.

Best regards,
Margaret Osei
Community Coordinator`;

const QUESTIONS = [
  { q: "When will construction of the garden begin?", options: ["March 15th", "March 20th", "April 1st", "November 1st"], correct: 2 },
  { q: "How much does it cost to rent a plot for one season?", options: ["$40", "$50", "$80", "$100"], correct: 1 },
  { q: "Who gets priority for plot allocation?", options: ["Long-term residents", "People who applied in November", "Volunteers", "First to pay"], correct: 1 },
  { q: "What is NOT included with each plot?", options: ["Shared tools", "Compost station", "Private water tap", "Water supply"], correct: 2 },
  { q: "What does the Garden Charter prohibit?", options: ["Composting", "Watering plants", "Pesticide use", "Sharing tools"], correct: 2 },
];

export default function ReadingTestPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    async function createSession() {
      try {
        const res = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "reading" }),
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
      // Calculate score
      const correct = newAnswers.filter((a, i) => a === QUESTIONS[i].correct).length;
      const score = Math.round((correct / QUESTIONS.length) * 12 * 10) / 10;

      // Save session
      if (sessionId) {
        await fetch("/api/sessions/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            answers: { responses: newAnswers },
            sectionScores: { reading: score },
          }),
        });
        router.push(`/tests/${sessionId}/results`);
      }
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  return (
    <div className="pt-2">
      <TimerBar totalSeconds={55 * 60} onExpire={handleNext} />
      <div className="pt-10 h-screen flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Passage */}
          <div className="overflow-y-auto border-r border-slate-200 p-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Reading Passage
            </div>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white rounded-xl border border-slate-100 p-5">
              {PASSAGE}
            </div>
          </div>

          {/* Questions */}
          <div className="overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Questions
              </span>
              <span className="text-sm text-slate-500">
                {current + 1} of {QUESTIONS.length}
              </span>
            </div>

            {/* Progress dots */}
            <div className="flex gap-1.5 mb-6">
              {QUESTIONS.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${
                  i < current ? "bg-blue-600" : i === current ? "bg-blue-300" : "bg-slate-200"
                }`} />
              ))}
            </div>

            <p className="text-base font-medium text-slate-800 mb-4">{q.q}</p>

            <div className="space-y-3 mb-6">
              {q.options.map((opt, i) => (
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

            <button
              onClick={handleNext}
              disabled={selected === null}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 transition"
            >
              {isLast ? "Submit Test" : "Next Question →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}