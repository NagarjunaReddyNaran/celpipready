export function FeedbackCard({ dimension, score, explanation, tip, locked = false }: {
  dimension: string; score: number; explanation: string; tip: string; locked?: boolean;
}) {
  const color = score >= 10 ? "text-green-600 bg-green-50 border-green-200"
              : score >= 7  ? "text-blue-600 bg-blue-50 border-blue-200"
              : score >= 4  ? "text-amber-600 bg-amber-50 border-amber-200"
              :               "text-red-600 bg-red-50 border-red-200";
  return (
    <div className={`rounded-xl border border-slate-200 p-4 ${locked ? "relative overflow-hidden" : ""}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800 text-sm">{dimension}</h3>
        <span className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold border ${color}`}>{score}/12</span>
      </div>
      <div className={locked ? "filter blur-sm select-none" : ""}>
        <p className="text-xs text-slate-600 mb-2">{explanation}</p>
        <div className="bg-blue-50 rounded-lg p-2.5">
          <p className="text-xs text-blue-700">💡 {tip}</p>
        </div>
      </div>
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <div className="text-center">
            <div className="text-xl mb-1">🔒</div>
            <p className="text-xs font-medium text-slate-700">Upgrade to unlock</p>
          </div>
        </div>
      )}
    </div>
  );
}
