"use client";
import { useState, useRef, useEffect } from "react";
import { Mic, Square } from "lucide-react";

export function AudioRecorder({ maxSeconds, onRecordingComplete, taskNumber }: {
  maxSeconds: number; onRecordingComplete: (blob: Blob) => void; taskNumber: number;
}) {
  const [phase, setPhase] = useState<"idle" | "recording" | "done">("idle");
  const [remaining, setRemaining] = useState(maxSeconds);
  const [bars, setBars] = useState<number[]>(Array(20).fill(4));
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const animRef = useRef<number>(0);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    ctx.createMediaStreamSource(stream).connect(analyser);
    const animate = () => {
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);
      setBars(Array.from({ length: 20 }, (_, i) => Math.max(4, Math.floor((data[Math.floor(i / 20 * data.length)] / 255) * 48))));
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    const rec = new MediaRecorder(stream);
    chunksRef.current = [];
    rec.ondataavailable = e => chunksRef.current.push(e.data);
    rec.onstop = () => {
      onRecordingComplete(new Blob(chunksRef.current, { type: "audio/webm" }));
      setPhase("done");
      stream.getTracks().forEach(t => t.stop());
      cancelAnimationFrame(animRef.current);
    };
    rec.start();
    mediaRef.current = rec;
    setPhase("recording");
    setRemaining(maxSeconds);
  };

  const stop = () => mediaRef.current?.stop();

  useEffect(() => {
    if (phase !== "recording") return;
    const t = setInterval(() => setRemaining(p => { if (p <= 1) { stop(); return 0; } return p - 1; }), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="bg-slate-50 rounded-2xl p-6 text-center">
      <p className="text-sm text-slate-500 mb-3">Task {taskNumber} of 8</p>
      {phase === "idle" && (
        <button onClick={start} className="mx-auto flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700">
          <Mic size={18} /> Start Recording
        </button>
      )}
      {phase === "recording" && (
        <div>
          <div className="flex items-end justify-center gap-0.5 h-12 mb-3">
            {bars.map((h, i) => <div key={i} className="w-1.5 bg-red-500 rounded-full" style={{ height: `${h}px` }} />)}
          </div>
          <p className="text-2xl font-mono font-bold text-red-600 mb-3">{fmt(remaining)}</p>
          <button onClick={stop} className="mx-auto flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-900">
            <Square size={16} /> Stop & Submit
          </button>
        </div>
      )}
      {phase === "done" && <p className="text-green-600 font-medium">✓ Recording submitted</p>}
    </div>
  );
}
