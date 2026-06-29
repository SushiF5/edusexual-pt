"use client";

import React from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
  fallbackText?: string;
}

function getMimeType(src: string): string {
  if (src.endsWith('.mp3')) return 'audio/mpeg';
  if (src.endsWith('.wav')) return 'audio/wav';
  if (src.endsWith('.ogg')) return 'audio/ogg';
  return 'audio/mpeg';
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title, fallbackText }) => {
  return (
    <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10 my-3" role="region" aria-label={`Audio: ${title}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-lg" role="img" aria-hidden="true">🎧</span>
        <span className="text-sm font-semibold text-primary">{title}</span>
      </div>
      <audio controls className="w-full rounded-xl" aria-label={`Reproduzir: ${title}`}>
        <source src={src} type={getMimeType(src)} />
        <p>{fallbackText || "O teu navegador não suporta a reprodução de áudio."}</p>
      </audio>
    </div>
  );
};

export default AudioPlayer;
