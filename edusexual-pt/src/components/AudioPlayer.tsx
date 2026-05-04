import React from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white my-4" role="region" aria-label={`Audio player: ${title}`}>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <audio controls className="w-full" aria-label={`Audio: ${title}`}>
        <source src={src} type="audio/mpeg" />
        <p>{t.audioNotSupported || "O teu navegador não suporta a reprodução de áudio."}</p>
      </audio>
    </div>
  );
};

export default AudioPlayer;
