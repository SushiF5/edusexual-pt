"use client";

import React, { useMemo, useEffect, useRef, useState, useCallback } from "react";

export interface AudioPlayerProps {
  src: string;
  title: string;
  fallbackText?: string;
  textToRead?: string;
}

const MIME_MAP: Record<string, string> = {
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
};

function getMimeType(src: string): string {
  for (const [ext, mime] of Object.entries(MIME_MAP)) {
    if (src.endsWith(ext)) return mime;
  }
  return "audio/mpeg";
}

function cleanTextForSpeech(text: string): string {
  return text
    .replace(/[#*_~`]/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\[\d+\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title,
  fallbackText,
  textToRead,
}) => {
  const mimeType = useMemo(() => getMimeType(src), [src]);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [audioError, setAudioError] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const contentToSpeak = useMemo(() => {
    const raw = textToRead || title;
    return cleanTextForSpeech(raw);
  }, [textToRead, title]);

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeechStatus("idle");
  }, []);

  const pauseSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
      setSpeechStatus("paused");
    }
  }, []);

  const resumeSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setSpeechStatus("playing");
    }
  }, []);

  const startSpeech = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(contentToSpeak);
    utterance.lang = "pt-PT";
    utterance.rate = playbackRate;
    utterance.pitch = 1.0;

    // Pick best Portuguese voice if available
    const voices = window.speechSynthesis.getVoices();
    const ptVoice =
      voices.find((v) => v.lang === "pt-PT" || v.lang.startsWith("pt-PT")) ||
      voices.find((v) => v.lang.startsWith("pt")) ||
      null;

    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onstart = () => setSpeechStatus("playing");
    utterance.onend = () => setSpeechStatus("idle");
    utterance.onerror = (e) => {
      if (e.error !== "canceled") {
        console.warn("Speech synthesis notice:", e.error);
      }
      setSpeechStatus("idle");
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [contentToSpeak, playbackRate]);

  const toggleSpeech = () => {
    if (speechStatus === "playing") {
      pauseSpeech();
    } else if (speechStatus === "paused") {
      resumeSpeech();
    } else {
      startSpeech();
    }
  };

  const cyclePlaybackRate = () => {
    const rates = [1.0, 1.25, 1.5];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (speechStatus === "playing") {
      stopSpeech();
      setTimeout(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(contentToSpeak);
          utterance.lang = "pt-PT";
          utterance.rate = nextRate;
          utterance.pitch = 1.0;
          utterance.onstart = () => setSpeechStatus("playing");
          utterance.onend = () => setSpeechStatus("idle");
          utterance.onerror = () => setSpeechStatus("idle");
          window.speechSynthesis.speak(utterance);
        }
      }, 50);
    }
  };

  return (
    <div
      className="p-3.5 bg-primary/5 dark:bg-primary/15 rounded-2xl border border-primary/15 dark:border-primary/25 my-3 shadow-xs transition-all"
      role="region"
      aria-label={`Audio: ${title}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-lg shrink-0" role="img" aria-hidden="true">
            🎧
          </span>
          <div className="min-w-0">
            <span className="text-sm font-bold text-primary dark:text-primary-light block truncate">
              {title}
            </span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <span>Leitura de Voz</span>
              {speechStatus === "playing" && (
                <span className="inline-flex items-center gap-0.5 text-secondary font-medium">
                  <span className="w-1 h-2 bg-secondary animate-pulse rounded-full" />
                  <span className="w-1 h-3 bg-secondary animate-pulse delay-75 rounded-full" />
                  <span className="w-1 h-2 bg-secondary animate-pulse delay-150 rounded-full" />
                  <span className="ml-1 text-[10px] uppercase font-bold">A ler</span>
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Speed toggle */}
        {speechSupported && (
          <button
            type="button"
            onClick={cyclePlaybackRate}
            className="text-[11px] font-mono font-bold px-2 py-1 rounded-lg bg-white/80 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title="Alterar velocidade de leitura"
            aria-label={`Velocidade de leitura: ${playbackRate}x`}
          >
            {playbackRate}x
          </button>
        )}
      </div>

      {/* Interactive Speech & Audio Controls */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {speechSupported ? (
          <>
            <button
              type="button"
              onClick={toggleSpeech}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                speechStatus === "playing"
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : speechStatus === "paused"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-primary hover:bg-primary-dark text-white"
              }`}
              aria-label={
                speechStatus === "playing"
                  ? "Pausar leitura em voz alta"
                  : speechStatus === "paused"
                  ? "Continuar leitura em voz alta"
                  : `Ouvir ${title} em voz alta`
              }
            >
              <span>
                {speechStatus === "playing" ? "⏸️" : speechStatus === "paused" ? "▶️" : "🔊"}
              </span>
              <span>
                {speechStatus === "playing"
                  ? "Pausar Leitura"
                  : speechStatus === "paused"
                  ? "Continuar"
                  : "Ouvir em Voz Alta"}
              </span>
            </button>

            {speechStatus !== "idle" && (
              <button
                type="button"
                onClick={stopSpeech}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition cursor-pointer"
                aria-label="Parar leitura em voz alta"
              >
                <span>⏹️</span>
                <span>Parar</span>
              </button>
            )}
          </>
        ) : null}
      </div>

      {/* Embedded HTML5 Audio element for backward compatibility & direct file playback */}
      <div className={audioError || speechSupported ? "mt-2 pt-2 border-t border-primary/10 dark:border-primary/20" : "mt-2"}>
        <audio
          ref={audioRef}
          controls
          preload="none"
          className="w-full h-8 rounded-lg dark:opacity-90 text-xs"
          controlsList="nodownload"
          aria-label={`Reproduzir: ${title}`}
          onError={() => setAudioError(true)}
        >
          <source src={src} type={mimeType} onError={() => setAudioError(true)} />
          <p>{fallbackText || "O teu navegador não suporta a reprodução de áudio."}</p>
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;

export interface LazyAudioPlayerProps {
  src: string;
  title: string;
  fallbackText?: string;
  loadLabel?: string;
  textToRead?: string;
}

export const LazyAudioPlayer: React.FC<LazyAudioPlayerProps> = ({
  src,
  title,
  fallbackText,
  loadLabel = "Carregar áudio",
  textToRead,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  if (!visible) {
    return (
      <div
        ref={ref}
        className="p-3 bg-primary/5 dark:bg-primary/20 rounded-2xl border border-primary/10 dark:border-primary/30 my-3"
        role="region"
        aria-label={`Audio: ${title}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-lg" role="img" aria-hidden="true">
              🎧
            </span>
            <button
              type="button"
              onClick={() => setVisible(true)}
              className="text-sm font-semibold text-primary dark:text-primary-light underline underline-offset-2 hover:text-secondary focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              {`${loadLabel}: ${title}`}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="text-xs bg-primary/10 hover:bg-primary/20 text-primary dark:text-primary-light px-2.5 py-1 rounded-lg font-semibold transition"
          >
            🔊 Ouvir
          </button>
        </div>
      </div>
    );
  }

  return (
    <AudioPlayer
      src={src}
      title={title}
      fallbackText={fallbackText}
      textToRead={textToRead}
    />
  );
};
