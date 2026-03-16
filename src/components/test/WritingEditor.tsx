"use client";

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

export function WritingEditor({ value, onChange, minWords = 150, maxWords = 200 }: {
  value: string; onChange: (v: string) => void; minWords?: number; maxWords?: number;
}) {
  const words = countWords(value);
  const color = words >= minWords && words <= maxWords ? "text-green-600" : words > maxWords ? "text-amber-600" : "text-slate-400";
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <textarea
        value={value} onChange={e => onChange(e.target.value)}
        placeholder="Begin writing your response here..."
        className="w-full h-64 p-4 text-slate-800 text-sm leading-relaxed resize-none outline-none"
        spellCheck={false} autoComplete="off" autoCorrect="off"
      />
      <div className="border-t border-slate-100 px-4 py-2 flex justify-between items-center bg-slate-50">
        <span className="text-xs text-slate-400">No spell check (mirrors real exam)</span>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-mono font-semibold ${color}`}>{words} words</span>
          <span className="text-xs text-slate-400">Target: {minWords}–{maxWords}</span>
        </div>
      </div>
    </div>
  );
}
