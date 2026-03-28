"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface AudioPlayerProps {
  script: string;         // Text read by TTS
  transcript: string;     // Formatted transcript shown to user
  context: string;        // Situation label
  partNumber: number;
}

type Status = "idle" | "loading" | "playing" | "done" | "unsupported";

export function AudioPlayer({ script, transcript, context, partNumber }: AudioPlayerProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [showTranscript, setShowTranscript] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const estimatedMs = useRef(0);
  const startedAt = useRef(0);

  // Estimate duration: average 140 words/min at rate 0.92
  const wordCount = script.split(/\s+/).length;
  estimatedMs.current = (wordCount / 140) * 60 * 1000 * (1 / 0.92);

  const clearProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const startProgress = () => {
    clearProgress();
    startedAt.current = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startedAt.current;
      const pct = Math.min((elapsed / estimatedMs.current) * 100, 98);
      setProgress(pct);
    }, 200);
  };

  const play = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    clearProgress();
    setProgress(0);
    setStatus("loading");

    const utter = new SpeechSynthesisUtterance(script);
    utter.rate = 0.92;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    // Pick best available English voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang === "en-US" && v.localService)
      ?? voices.find(v => v.lang.startsWith("en-CA"))
      ?? voices.find(v => v.lang.startsWith("en-US"))
      ?? voices.find(v => v.lang.startsWith("en"))
      ?? null;
    if (preferred) utter.voice = preferred;

    utter.onstart = () => {
      setStatus("playing");
      setPlayCount(n => n + 1);
      startProgress();
    };

    utter.onend = () => {
      clearProgress();
      setProgress(100);
      setStatus("done");
    };

    utter.onerror = () => {
      clearProgress();
      setStatus("idle");
    };

    window.speechSynthesis.speak(utter);
  }, [script]);

  const stop = () => {
    window.speechSynthesis?.cancel();
    clearProgress();
    setProgress(0);
    setStatus("idle");
  };

  // Check browser support + auto-play after short delay
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.speechSynthesis) {
      setStatus("unsupported");
      setShowTranscript(true);
      return;
    }

    // Voices load asynchronously in Chrome
    const tryAutoPlay = () => {
      setTimeout(play, 600);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      tryAutoPlay();
    } else {
      window.speechSynthesis.onvoiceschanged = tryAutoPlay;
    }

    return () => {
      window.speechSynthesis.cancel();
      clearProgress();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset when question changes
  useEffect(() => {
    window.speechSynthesis?.cancel();
    clearProgress();
    setStatus("idle");
    setProgress(0);
    setPlayCount(0);
    setShowTranscript(false);
  }, [script]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 mb-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Part {partNumber}
          </span>
          <p className="text-sm text-slate-600 mt-0.5">{context}</p>
        </div>
        {playCount > 0 && (
          <span className="text-xs text-green-700 bg-green-100 px-2.5 py-1 rounded-full font-medium">
            ✓ Played {playCount}×
          </span>
        )}
      </div>

      {/* Player UI */}
      {status === "unsupported" ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
          <p className="text-xs text-amber-700 font-medium">
            Audio not supported in this browser. Read the transcript below.
          </p>
        </div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="h-2 bg-blue-100 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full rounded-full transition-all duration-200 ${
                status === "done" ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {status === "playing" ? (
              <>
                {/* Animated bars */}
                <div className="flex items-end gap-0.5 h-8">
                  {[3, 5, 4, 6, 3, 5, 4].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-blue-500 rounded-full animate-pulse"
                      style={{
                        height: `${h * 4}px`,
                        animationDelay: `${i * 100}ms`,
                        animationDuration: "600ms",
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-blue-700 flex-1">Listening…</span>
                <button
                  onClick={stop}
                  className="text-xs text-slate-500 border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-white transition"
                >
                  Stop
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={play}
                  disabled={status === "loading"}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M2 1.5l10 5.5-10 5.5V1.5z"/>
                  </svg>
                  {status === "loading" ? "Loading…" : status === "done" ? "Replay" : "Play Audio"}
                </button>

                {status === "done" && (
                  <span className="text-xs text-green-700 font-medium">Audio complete</span>
                )}
                {status === "idle" && playCount === 0 && (
                  <span className="text-xs text-slate-400">Audio will play automatically</span>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* Transcript toggle */}
      <div className="mt-4 pt-3 border-t border-blue-100">
        <button
          onClick={() => setShowTranscript(v => !v)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <span>{showTranscript ? "▲" : "▼"}</span>
          {showTranscript ? "Hide transcript" : "Show transcript"}
          <span className="text-blue-400 font-normal ml-1">(for review after listening)</span>
        </button>

        {showTranscript && (
          <div className="mt-3 bg-white rounded-xl border border-blue-100 p-4 text-xs text-slate-600 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
            {transcript}
          </div>
        )}
      </div>
    </div>
  );
}
