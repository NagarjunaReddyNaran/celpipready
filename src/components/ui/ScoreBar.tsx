"use client";
import { useEffect, useState } from "react";

export function ScoreBar({ label, score, maxScore = 12 }: { label: string; score: number; maxScore?: number }) {
  const [width, setWidth] = useState(0);
  const pct = (score / maxScore) * 100;
  const color = score >= 10 ? "#16A34A" : score >= 7 ? "#2563EB" : score >= 4 ? "#D97706" : "#DC2626";
  useEffect(() => { const t = setTimeout(() => setWidth(pct), 150); return () => clearTimeout(t); }, [pct]);
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-mono font-semibold" style={{ color }}>{score}/{maxScore}</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${width}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
