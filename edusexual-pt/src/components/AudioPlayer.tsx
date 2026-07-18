"use client";

import React, { useMemo } from 'react';

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
    <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10 my-3" role="region" aria-label={`Audio: ${title}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-lg" role="img" aria-hidden="true">🎧</span>
        <span className="text-sm font-semibold text-primary">{title}</span>
      </div>
      <audio controls className="w-full rounded-xl" controlsList="nodownload" aria-label={`Reproduzir: ${title}`}>
        <source src={src} type={mimeType} />
        <p>{fallbackText || "O teu navegador não suporta a reprodução de áudio."}</p>
      </audio>
    </div>
  );
};

export default AudioPlayer;
