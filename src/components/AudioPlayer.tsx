"use client";

import React, { useMemo, useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
  fallbackText?: string;
}

const MIME_MAP: Record<string, string> = {
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
};

function getMimeType(src: string): string {
  for (const [ext, mime] of Object.entries(MIME_MAP)) {
    if (src.endsWith(ext)) return mime;
  }
  return 'audio/mpeg';
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title, fallbackText }) => {
  const mimeType = useMemo(() => getMimeType(src), [src]);

  return (
    <div className="p-3 bg-primary/5 dark:bg-primary/20 rounded-2xl border border-primary/10 dark:border-primary/30 my-3" role="region" aria-label={`Audio: ${title}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-lg" role="img" aria-hidden="true">🎧</span>
        <span className="text-sm font-semibold text-primary dark:text-primary-light">{title}</span>
      </div>
      <audio controls preload="none" className="w-full rounded-xl dark:opacity-90" controlsList="nodownload" aria-label={`Reproduzir: ${title}`}>
        <source src={src} type={mimeType} />
        <p>{fallbackText || "O teu navegador não suporta a reprodução de áudio."}</p>
      </audio>
    </div>
  );
};

export default AudioPlayer;

interface LazyAudioPlayerProps {
  src: string;
  title: string;
  fallbackText?: string;
  loadLabel?: string;
}

export const LazyAudioPlayer: React.FC<LazyAudioPlayerProps> = ({
  src,
  title,
  fallbackText,
  loadLabel = "Carregar áudio",
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
        <div className="flex items-center gap-3">
          <span className="text-lg" role="img" aria-hidden="true">🎧</span>
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="text-sm font-semibold text-primary dark:text-primary-light underline underline-offset-2 hover:text-secondary focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            {`${loadLabel}: ${title}`}
          </button>
        </div>
      </div>
    );
  }

  return <AudioPlayer src={src} title={title} fallbackText={fallbackText} />;
};
