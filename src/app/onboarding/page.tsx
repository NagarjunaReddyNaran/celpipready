"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const GOALS = [
  { value: "express_entry",   label: "Express Entry",          icon: "🇨🇦", desc: "Need CLB 7+ in all sections" },
  { value: "citizenship",     label: "Canadian Citizenship",   icon: "🏛️", desc: "Need CLB 4+ in all sections" },
  { value: "professional",    label: "Professional Licensing", icon: "💼", desc: "Healthcare, engineering, legal" },
  { value: "university",      label: "University Admission",   icon: "🎓", desc: "Post-secondary program entry" },
  { value: "other",           label: "Other / General Prep",   icon: "📚", desc: "Improving English skills" },
];

const SECTIONS = [
  { value: "listening", label: "Listening", icon: "🎧" },
  { value: "reading",   label: "Reading",   icon: "📖" },
  { value: "writing",   label: "Writing",   icon: "✍️" },
  { value: "speaking",  label: "Speaking",  icon: "🎙️" },
];

type FormData = {
  name: string;
  goalType: string;
  targetTestDate: string;
  weakAreas: string[];
};

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [step, setStep] = useState(1);

  // If already onboarded, skip straight to dashboard
  useEffect(() => {
    if ((session?.user as { onboarded?: boolean })?.onboarded === true) {
      router.replace("/dashboard");
    }
  }, [session, router]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    name:           (session?.user?.name ?? "").split(" ")[0],
    goalType:       "",
    targetTestDate: "",
    weakAreas:      [],
  });

  function toggleWeakArea(val: string) {
    setForm(f => ({
      ...f,
      weakAreas: f.weakAreas.includes(val)
        ? f.weakAreas.filter(w => w !== val)
        : [...f.weakAreas, val],
    }));
  }

  async function handleFinish() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");
      // Refresh session so middleware sees onboarded=true
      await update();
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  async function handleSkip() {
    setSaving(true);
    await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, goalType: form.goalType || "other" }),
    });
    await update();
    router.push("/dashboard");
  }

  const totalSteps = 3;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
            Step {step} of {totalSteps}
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {step === 1 && "Welcome to CelpipReady!"}
            {step === 2 && "What's your CELPIP goal?"}
            {step === 3 && "Personalize your practice"}
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            {step === 1 && "Let's set up your account in 3 quick steps."}
            {step === 2 && "We'll tailor your practice experience to your goal."}
            {step === 3 && "Tell us where you'd like to improve."}
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-8">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s <= step ? "bg-blue-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Step 1 — Name */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What should we call you?
            </label>
            <input
              autoFocus
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your first name"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
            />
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-blue-800 mb-2">Your free account includes:</p>
              <ul className="text-xs text-blue-700 space-y-1.5">
                <li>✓ 5 free practice tests (Listening, Reading, Writing)</li>
                <li>✓ Instant scoring on all tests</li>
                <li>✓ Score history on your dashboard</li>
                <li>✗ AI feedback (Standard / Premium plan)</li>
                <li>✗ Speaking test (Premium plan)</li>
              </ul>
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!form.name.trim()}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 transition"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2 — Goal */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 mb-4">Select the option that best describes your reason:</p>
            <div className="space-y-2 mb-6">
              {GOALS.map(g => (
                <button
                  key={g.value}
                  onClick={() => setForm(f => ({ ...f, goalType: g.value }))}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition text-left ${
                    form.goalType === g.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-2xl">{g.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-slate-800">{g.label}</p>
                    <p className="text-xs text-slate-500">{g.desc}</p>
                  </div>
                  {form.goalType === g.value && (
                    <span className="ml-auto text-blue-600 text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-slate-300 py-3 rounded-xl text-sm font-medium hover:bg-slate-50"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.goalType}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 transition"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Target date + weak areas */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                When is your exam? <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="date"
                value={form.targetTestDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={e => setForm(f => ({ ...f, targetTestDate: e.target.value }))}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-400 mt-1">Sets the countdown on your dashboard.</p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-slate-700 mb-3">
                Which sections do you want to focus on?{" "}
                <span className="text-slate-400 font-normal">(pick all that apply)</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SECTIONS.map(s => (
                  <button
                    key={s.value}
                    onClick={() => toggleWeakArea(s.value)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition ${
                      form.weakAreas.includes(s.value)
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{s.label}</span>
                    {form.weakAreas.includes(s.value) && (
                      <span className="ml-auto text-blue-600 text-sm">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                disabled={saving}
                className="flex-1 border border-slate-300 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 disabled:opacity-40"
              >
                ← Back
              </button>
              <button
                onClick={handleFinish}
                disabled={saving}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-60 transition"
              >
                {saving ? "Setting up…" : "Go to Dashboard →"}
              </button>
            </div>
          </div>
        )}

        {/* Skip link */}
        <p className="text-center mt-5">
          <button
            onClick={handleSkip}
            disabled={saving}
            className="text-xs text-slate-400 hover:text-slate-600 underline"
          >
            Skip for now — I&apos;ll set this up later
          </button>
        </p>

      </div>
    </div>
  );
}
