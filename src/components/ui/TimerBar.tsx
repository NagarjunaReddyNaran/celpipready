"use client";
import { useEffect, useState } from "react";

export function TimerBar({ totalSeconds, onExpire }: { totalSeconds: number; onExpire?: () => void }) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const pct = (remaining / totalSeconds) * 100;
  const color = remaining <= 120 ? "#DC2626" : remaining <= 300 ? "#D97706" : "#2563EB";
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining(p => { if (p <= 1) { onExpire?.(); return 0; } return p - 1; }), 1000);
    return () => clearInterval(t);
  }, [remaining, onExpire]);
  return (
    <div className="fixed top-14 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="h-1.5 bg-slate-100">
        <div className="h-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <div className="flex justify-end px-4 py-1">
        <span className="text-xs font-mono font-semibold" style={{ color }}>{fmt(remaining)} remaining</span>
      </div>
    </div>
  );
}
