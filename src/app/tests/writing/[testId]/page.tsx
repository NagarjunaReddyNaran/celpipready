"use client";
import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { TimerBar } from "@/components/ui/TimerBar";
import { WritingEditor } from "@/components/test/WritingEditor";

const TASK1_PROMPT = `You recently had a problem with a product you bought from an online store. Write an email to the company's customer service team. In your email:
- Describe the product and the problem
- Explain how this has affected you
- Request a specific solution (refund, replacement, or repair)
Write 150–200 words.`;

const TASK2_PROMPT = `Your community centre has sent you a survey about improving local facilities. Respond to all three points:
1. The centre is considering adding either a gym or a library extension. Which would you prefer and why?
2. The parking lot is often full on weekends. What solution would you suggest?
3. The centre wants to offer new evening classes. What type of class would most benefit your community?
Write 150–200 words.`;

export default function WritingTestPage() {
  const { testId } = useParams<{ testId: string }>();
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [phase, setPhase] = useState<"loading" | "task1" | "task2" | "submitting">("loading");
  const [task1, setTask1] = useState("");
  const [task2, setTask2] = useState("");
  const [error, setError] = useState("");
  const [submitStatus, setSubmitStatus] = useState("Saving your test...");

  useEffect(() => {
    async function createSession() {
      try {
        const res = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "writing" }),
        });
        const data = await res.json();
        if (data.limitReached) {
          router.push("/pricing");
          return;
        }
        if (data.sessionId) {
          setSessionId(data.sessionId);
          setPhase("task1");
        } else {
          setError("Could not start test. Please try again.");
          setPhase("task1");
        }
      } catch {
        setError("Network error. Please refresh.");
        setPhase("task1");
      }
    }
    if (testId === "new") {
      createSession();
    } else {
      setSessionId(testId);
      setPhase("task1");
    }
  }, [testId, router]);

  const submit = useCallback(async (t1: string, t2: string, sid: string) => {
    setPhase("submitting");
    setSubmitStatus("Saving your answers...");

    try {
      // Step 1 — save answers
      await fetch("/api/sessions/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid, answers: { task1: t1, task2: t2 } }),
      });

      // Step 2 — call AI scoring, always redirect after regardless
      setSubmitStatus("Analyzing your writing with AI...");
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 25000);
        await fetch("/api/writing-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sid,
            task1Prompt: TASK1_PROMPT,
            task1Response: t1,
            task2Prompt: TASK2_PROMPT,
            task2Response: t2,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
      } catch {
        // Any error including 429 — just continue to results
      }

      // Always go to results
      router.push(`/tests/${sid}/results`);

    } catch {
      setError("Something went wrong. Please try again.");
      setPhase("task2");
    }
  }, [router]);

  const handleSubmit = () => {
    if (!sessionId) {
      setError("Session not ready. Please wait a moment.");
      return;
    }
    submit(task1, task2, sessionId);
  };

  if (phase === "loading") return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-500 text-sm">Starting your test...</p>
      </div>
    </div>
  );

  if (phase === "submitting") return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-slate-800">{submitStatus}</h2>
        <p className="text-slate-500 text-sm mt-1">
          {submitStatus.includes("AI") ? "This takes 15–25 seconds." : "Just a moment..."}
        </p>
      </div>
    </div>
  );

  return (
    <div className="pt-2">
      <TimerBar
        totalSeconds={phase === "task1" ? 27 * 60 : 26 * 60}
        onExpire={phase === "task1" ? () => setPhase("task2") : handleSubmit}
      />
      <div className="max-w-3xl mx-auto px-4 pt-14 pb-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
            {phase === "task1" ? "Task 1 of 2" : "Task 2 of 2"}
          </span>
          <span>
            {phase === "task1" ? "Email Writing · 27 min" : "Survey Response · 26 min"}
          </span>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {phase === "task1" ? TASK1_PROMPT : TASK2_PROMPT}
          </p>
        </div>

        <WritingEditor
          value={phase === "task1" ? task1 : task2}
          onChange={phase === "task1" ? setTask1 : setTask2}
        />

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

        <div className="flex justify-end mt-4">
          {phase === "task1" ? (
            <button
              onClick={() => setPhase("task2")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              Submit Task 1 & Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              Submit Test →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}