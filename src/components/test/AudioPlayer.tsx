"use client";
import { useState, useEffect, useRef } from "react";

interface AudioPlayerProps {
  script: string;
  transcript: string;
  context: string;
  partNumber: number;
}

type Status = "idle" | "playing" | "done" | "unsupported";

// ─────────────────────────────────────────────────────────────────────────────
// ROOT CAUSE: Chrome's SpeechSynthesis engine hard-pauses any utterance that
// exceeds ~14 seconds.  A 230-word script ≈ 107 seconds — it goes silent at
// the 14-second mark.  resume() via setInterval does NOT reliably restart the
// audio pipeline once Chrome stalls it.
//
// FIX: split the script into chunks of ≤ 25 words (~12 s at rate 0.92), then
// chain them via onend callbacks.  No single chunk ever hits the 14 s limit.
// ─────────────────────────────────────────────────────────────────────────────

const WORDS_PER_CHUNK = 24; // ~11 s at rate 0.92, 140 wpm — safely under 14 s

function splitIntoChunks(text: string): string[] {
  // 1. Split at natural line breaks (dialogue turns)
  const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean);

  const chunks: string[] = [];

  for (const line of lines) {
    const words = line.split(/\s+/);

    if (words.length <= WORDS_PER_CHUNK) {
      // Line fits in one chunk
      chunks.push(line);
    } else {
      // Line is too long — break at sentence boundaries first,
      // then hard-wrap anything still over the limit
      const sentences = line
        .replace(/([.!?])\s+/g, "$1\n")
        .split("\n")
        .map(s => s.trim())
        .filter(Boolean);

      for (const sentence of sentences) {
        const sentenceWords = sentence.split(/\s+/);
        if (sentenceWords.length <= WORDS_PER_CHUNK) {
          chunks.push(sentence);
        } else {
          // Hard-wrap: group into WORDS_PER_CHUNK word blocks
          for (let i = 0; i < sentenceWords.length; i += WORDS_PER_CHUNK) {
            chunks.push(sentenceWords.slice(i, i + WORDS_PER_CHUNK).join(" "));
          }
        }
      }
    }
  }

  return chunks;
}

export function AudioPlayer({ script, transcript, context, partNumber }: AudioPlayerProps) {
  const [status, setStatus]               = useState<Status>("idle");
  const [showTranscript, setShowTranscript] = useState(false);
  const [playCount, setPlayCount]         = useState(0);
  const [progress, setProgress]           = useState(0);

  // Voices cached once onvoiceschanged fires
  const voicesRef  = useRef<SpeechSynthesisVoice[]>([]);
  // Set to true when stop() is called — prevents onend from advancing chunks
  const stoppedRef = useRef(false);

  // Chunks are stable for a given script
  const chunks     = useRef<string[]>([]);

  // ── helpers ────────────────────────────────────────────────────────────────

  function pickVoice(): SpeechSynthesisVoice | null {
    const v = voicesRef.current;
    return (
      v.find(x => x.lang === "en-US" && x.localService) ??
      v.find(x => x.lang === "en-CA" && x.localService) ??
      v.find(x => x.lang.startsWith("en-US")) ??
      v.find(x => x.lang.startsWith("en-CA")) ??
      v.find(x => x.lang.startsWith("en")) ??
      v[0] ??
      null
    );
  }

  // ── load voices on mount ───────────────────────────────────────────────────

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.speechSynthesis) {
      setStatus("unsupported");
      setShowTranscript(true);
      return;
    }

    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      if (list.length > 0) voicesRef.current = list;
    };

    loadVoices();                                        // Firefox/Safari: synchronous
    window.speechSynthesis.onvoiceschanged = loadVoices; // Chrome: async

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  // ── reset when part changes ────────────────────────────────────────────────

  useEffect(() => {
    stoppedRef.current = true; // stops the onend chain immediately
    // Do NOT call cancel() here — the useEffect([]) cleanup already calls it
    // on real unmount (key={partIndex} swaps the whole component).
    // Calling cancel() here triggers it on React Strict Mode's fake unmount/remount
    // cycle too, which races against speak() and produces a "canceled" error.
    setStatus("idle");
    setProgress(0);
    setPlayCount(0);
    setShowTranscript(false);
    chunks.current = splitIntoChunks(script);
  }, [script]);

  // ── core: speak one chunk, then advance to the next ───────────────────────

  function speakChunk(index: number, totalChunks: number, voice: SpeechSynthesisVoice | null) {
    if (stoppedRef.current) return;
    if (index >= totalChunks) {
      setProgress(100);
      setStatus("done");
      return;
    }

    const text  = chunks.current[index];
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang   = "en-US";
    utter.rate   = 0.92;
    utter.volume = 1.0;
    utter.pitch  = 1.0;
    if (voice) utter.voice = voice;

    utter.onstart = () => {
      console.log(`[AudioPlayer] chunk ${index + 1}/${totalChunks} started`);
    };

    utter.onend = () => {
      console.log(`[AudioPlayer] chunk ${index + 1}/${totalChunks} ended`);
      if (stoppedRef.current) return;
      setProgress(Math.round(((index + 1) / totalChunks) * 100));
      speakChunk(index + 1, totalChunks, voice);
    };

    utter.onerror = (e) => {
      if (e.error === "interrupted") return; // fired by cancel() on Stop/replay — ignore
      if (e.error === "canceled" && !stoppedRef.current) {
        // "canceled" = something called cancel() AFTER speak() queued this utterance.
        // Root cause: React Strict Mode's fake unmount fires useEffect cleanup (cancel())
        // in a race with our speak(). Retry once after 150 ms — by then the cycle
        // has fully settled and the new speak() goes through cleanly.
        console.warn(`[AudioPlayer] Chunk ${index} canceled (race), retrying in 150 ms…`);
        setTimeout(() => speakChunk(index, totalChunks, voice), 150);
        return;
      }
      console.error("[AudioPlayer] TTS error on chunk", index, "—", e.error);
      setStatus("idle");
    };

    window.speechSynthesis.speak(utter);
  }

  // ── play ───────────────────────────────────────────────────────────────────

  function play() {
    if (!window.speechSynthesis) return;

    stoppedRef.current = false;

    setProgress(0);
    setStatus("playing");
    setPlayCount(n => n + 1);

    const voice       = pickVoice();
    const totalChunks = chunks.current.length;

    console.log(
      `[AudioPlayer] play() — part ${partNumber}, chunks: ${totalChunks},`,
      `voice: ${voice?.name ?? "none (lang=en-US fallback)"}`,
      `voices loaded: ${voicesRef.current.length},`,
      `speaking: ${window.speechSynthesis.speaking}`
    );

    // Always cancel first to flush Chrome's internal TTS audio session.
    // The Strict Mode cleanup leaves Chrome in a stale state — without this reset,
    // speak() runs silently (utterance fires events but no audio output).
    // 50 ms is enough for Chrome's cancel to fully flush the pipeline before speak().
    // This no longer races with useEffect([script]) cancel (removed) so "canceled"
    // errors won't re-appear.
    window.speechSynthesis.cancel();
    setTimeout(() => {
      if (!stoppedRef.current) speakChunk(0, totalChunks, voice);
    }, 50);
  }

  // ── stop ───────────────────────────────────────────────────────────────────

  function stop() {
    stoppedRef.current = true;
    window.speechSynthesis?.cancel();
    setProgress(0);
    setStatus("idle");
  }

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 mb-6">

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Part {partNumber}
          </span>
          <p className="text-sm text-slate-600 mt-0.5">{context}</p>
        </div>
        {playCount > 0 && (
          <span className="text-xs text-green-700 bg-green-100 px-2.5 py-1 rounded-full font-medium shrink-0 ml-3">
            ✓ Played {playCount}×
          </span>
        )}
      </div>

      {status === "unsupported" ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3 text-xs text-amber-700 font-medium">
          Audio is not supported in this browser. Please read the transcript below.
        </div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="h-2 bg-blue-100 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                status === "done" ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {status === "playing" ? (
              <>
                <div className="flex items-end gap-0.5 h-7">
                  {[2, 4, 3, 5, 2, 4, 3].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-blue-500 rounded-full"
                      style={{
                        height: `${h * 4}px`,
                        animation: `pulse 0.6s ease-in-out ${i * 80}ms infinite alternate`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-blue-700 flex-1">Playing audio…</span>
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
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition"
                >
                  <svg width="13" height="14" viewBox="0 0 13 14" fill="currentColor">
                    <path d="M1.5 1.2l10 5.8-10 5.8V1.2z"/>
                  </svg>
                  {status === "done" ? "Replay Audio" : "Play Audio"}
                </button>
                {status === "done" && (
                  <span className="text-xs text-green-700 font-medium">Audio finished</span>
                )}
                {status === "idle" && playCount === 0 && (
                  <span className="text-xs text-slate-400">Press Play to begin</span>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* Transcript */}
      <div className="mt-4 pt-3 border-t border-blue-100">
        <button
          onClick={() => setShowTranscript(v => !v)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1.5"
        >
          <span>{showTranscript ? "▲" : "▼"}</span>
          {showTranscript ? "Hide transcript" : "Show transcript"}
          <span className="text-blue-400 font-normal">(review after listening)</span>
        </button>
        {showTranscript && (
          <div className="mt-3 bg-white rounded-xl border border-blue-100 p-4 text-xs text-slate-600 leading-relaxed whitespace-pre-line max-h-52 overflow-y-auto">
            {transcript}
          </div>
        )}
      </div>

    </div>
  );
}
