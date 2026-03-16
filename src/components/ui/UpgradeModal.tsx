"use client";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export function UpgradeModal({ isOpen, onClose, reason = "limit" }: {
  isOpen: boolean; onClose: () => void; reason?: "limit" | "speaking" | "aifeedback";
}) {
  const router = useRouter();
  if (!isOpen) return null;
  const messages = {
    limit:     { title: "You've used all 5 free tests.", sub: "Upgrade to Standard for unlimited practice." },
    speaking:  { title: "Speaking tests are Premium only.", sub: "Get AI speaking feedback with Premium." },
    aifeedback:{ title: "AI feedback requires a paid plan.", sub: "Upgrade to Standard for writing feedback." }
  };
  const { title, sub } = messages[reason];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">⬆️</div>
          <button onClick={onClose}><X size={20} className="text-slate-400" /></button>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">{title}</h2>
        <p className="text-slate-600 mb-6 text-sm">{sub}</p>
        <button onClick={() => router.push("/pricing")} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 mb-2">
          Upgrade Now
        </button>
        <button onClick={onClose} className="w-full text-slate-500 py-2 text-sm hover:text-slate-700">Maybe Later</button>
      </div>
    </div>
  );
}
