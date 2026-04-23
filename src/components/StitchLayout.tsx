"use client";

import { useState, useEffect } from "react";

interface StitchLayoutProps {
  htmlUrl: string;
  onClose: () => void;
}

export default function StitchLayout({ htmlUrl, onClose }: StitchLayoutProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex flex-col backdrop-blur-sm">
      <div className="bg-white p-4 flex justify-between items-center shadow-lg">
        <h3 className="text-xl font-bold text-primary">Layout Dinâmico (Stitch)</h3>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      
      <div className="flex-grow relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-gray-600 animate-pulse">A carregar o design...</p>
            </div>
          </div>
        )}
        <iframe 
          src={htmlUrl} 
          className="w-full h-full border-none"
          onLoad={() => setLoading(false)}
          title="Stitch Layout"
        />
      </div>
    </div>
  );
}
