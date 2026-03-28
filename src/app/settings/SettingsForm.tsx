"use client";
import { useState } from "react";

type Props = {
  initialName: string;
  initialTargetDate: string;
  initialReminder: boolean;
  plan: string;
};

export function SettingsForm({ initialName, initialTargetDate, initialReminder, plan }: Props) {
  const [name, setName] = useState(initialName);
  const [targetTestDate, setTargetTestDate] = useState(initialTargetDate);
  const [reminderEnabled, setReminderEnabled] = useState(initialReminder);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, targetTestDate: targetTestDate || null, reminderEnabled })
      });
      setStatus(res.ok ? "saved" : "error");
      if (res.ok) setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSave}>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Display name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target test date</label>
            <input
              type="date"
              value={targetTestDate}
              onChange={e => setTargetTestDate(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-400 mt-1">Powers the countdown on your dashboard</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Email reminders</p>
              <p className="text-xs text-slate-400">Daily practice nudges before your test date</p>
            </div>
            <button
              type="button"
              onClick={() => setReminderEnabled(v => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                reminderEnabled ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  reminderEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "saving"}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {status === "saving" ? "Saving…" : "Save Changes"}
            </button>
            {status === "saved" && <span className="text-sm text-green-600 font-medium">Saved!</span>}
            {status === "error" && <span className="text-sm text-red-600">Failed to save. Try again.</span>}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">Billing</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-800">Current plan</p>
            <p className="text-sm text-slate-500 capitalize">{plan}</p>
          </div>
          {plan !== "free" ? (
            <a href="/api/stripe/portal" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Manage billing →</a>
          ) : (
            <a href="/pricing" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">Upgrade Plan</a>
          )}
        </div>
      </div>
    </form>
  );
}
