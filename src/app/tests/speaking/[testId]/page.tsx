"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AudioRecorder } from "@/components/test/AudioRecorder";

const TASKS = [
  "Your friend is thinking about moving to a new city for work. Give your friend advice about what to consider before making this decision. Speak for 60–90 seconds.",
  "Describe a skill you have learned on your own without any formal training. How did you learn it, and how has it been useful to you? Speak for 60–90 seconds.",
  "Your manager has asked you to suggest improvements to your team's weekly meetings. What changes would you recommend and why? Speak for 60–90 seconds.",
  "Talk about a place in your home city or country that you would recommend to a visitor. What makes it special? Speak for 60–90 seconds.",
  "You are talking with a neighbour who is concerned about noise in the building. How would you handle this situation? Speak for 60–90 seconds.",
  "Describe a time when you had to adapt quickly to an unexpected change at work or school. What happened and what did you learn? Speak for 60–90 seconds.",
  "Your community is planning to build either a new playground or a community garden on an empty lot. Which would you support and why? Speak for 60–90 seconds.",
  "Talk about a person who has had a positive influence on your life. Who are they, and how have they influenced you? Speak for 60–90 seconds.",
];

export default function SpeakingTestPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [taskIndex, setTaskIndex] = useState(0);
  const [phase, setPhase] = useState<"loading" | "prep" | "record" | "uploading">("loading");
  const [prepCountdown, setPrepCountdown] = useState(30);
  const [recordings, setRecordings] = useState<{ prompt: string; audioUrl: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function createSession() {
      try {
        const res = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "speaking" }),
        });
        const data = await res.json();
        if (data.limitReached) { router.push("/pricing"); return; }
        if (data.premiumRequired) { router.push("/pricing"); return; }
        if (data.sessionId) {
          setSessionId(data.sessionId);
          setPhase("prep");
        }
      } catch {
        setError("Could not start session. Please try again.");
      }
    }
    createSession();
  }, [router]);

  const startPrep = () => {
  setPrepCountdown(30);
  const t = setInterval(() => {
    setPrepCountdown(p => {
      if (p <= 1) { clearInterval(t); setPhase("record"); return 0; }
      return p - 1;
    });
  }, 1000);
};

  const handleRecording = async (blob: Blob) => {
    setPhase("uploading");
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      const res = await fetch("/api/upload-audio", { method: "POST", body: formData });
      const { url } = await res.json();
      const newRecordings = [...recordings, { prompt: TASKS[taskIndex], audioUrl: url }];
      setRecordings(newRecordings);

      if (taskIndex < TASKS.length - 1) {
        setTaskIndex(i => i + 1);
        setPrepCountdown(30);
        setPhase("prep");
      } else {
        await submitAll(newRecordings);
      }
    } catch {
      setError("Upload failed. Please try again.");
      setPhase("record");
    }
  };

  const submitAll = async (recs: { prompt: string; audioUrl: string }[]) => {
  setSubmitting(true);
  if (sessionId) {
    // Step 1 — save session
    await fetch("/api/sessions/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        answers: { recordings: recs },
        sectionScores: { speaking: 0 },
      }),
    });

    // Step 2 — wait for AI scoring with 60 second timeout
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);
      await fetch("/api/speaking-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, tasks: recs }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
    } catch {
      // AI failed or timed out — results page will show refresh button
    }

    // Step 3 — redirect to results
    router.push(`/tests/${sessionId}/results`);
  }
};

  if (phase === "loading") return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-500 text-sm">Starting your test...</p>
      </div>
    </div>
  );

  if (submitting) return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-slate-800">Analyzing your speaking with AI...</h2>
      <p className="text-slate-500 text-sm mt-1">This takes 30–60 seconds. Please wait.</p>
    </div>
  </div>
);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-900">Speaking Test</h1>
        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Task {taskIndex + 1} of {TASKS.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(taskIndex / TASKS.length) * 100}%` }}
        />
      </div>

      {/* Task prompt */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <p className="text-sm text-slate-700 leading-relaxed">{TASKS[taskIndex]}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Prep phase */}
      {/* Prep phase */}
      {phase === "prep" && prepCountdown === 30 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <p className="text-slate-500 text-sm mb-4">Read the task above, then click to start your preparation time</p>
          <button
            onClick={startPrep}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
          >
            Start Preparation (30s)
          </button>
        </div>
      )}

      {/* Counting down */}
      {phase === "prep" && prepCountdown < 30 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <p className="text-slate-500 text-sm mb-2">Preparation time</p>
          <div className="text-6xl font-mono font-bold text-blue-600 mb-4">{prepCountdown}</div>
          <p className="text-sm text-slate-400">Recording will start automatically</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(prepCountdown / 30) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Record phase */}
      {phase === "record" && (
        <AudioRecorder
          maxSeconds={90}
          taskNumber={taskIndex + 1}
          onRecordingComplete={handleRecording}
        />
      )}

      {/* Uploading phase */}
      {phase === "uploading" && (
        <div className="bg-slate-50 rounded-xl p-6 text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Uploading recording...</p>
        </div>
      )}
    </div>
  );
}