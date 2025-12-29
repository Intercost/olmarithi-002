'use client'
import { useState, useEffect } from 'react';

export default function EventModal({ event }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (event) {
      const timer = setTimeout(() => setIsOpen(true), 1500); // Show after 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, [event]);

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-emerald-500/30 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="inline-block p-3 bg-emerald-500/10 rounded-full mb-4">
          <span className="text-3xl">✨</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
        <p className="text-zinc-400 mb-6">{event.content}</p>
        <button 
          onClick={() => setIsOpen(false)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}