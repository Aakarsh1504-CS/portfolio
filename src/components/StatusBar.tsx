'use client';

import { useEffect, useState } from 'react';

const StatusBar = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const t = d.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata',
      });
      setTime(t);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/70 backdrop-blur-md font-mono text-[11px] tracking-wider uppercase text-[var(--fg-muted)]">
      <div className="container mx-auto px-4 h-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-75 animate-ping" />
              <span className="relative rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="text-[var(--fg)]">online</span>
          </span>
          <span className="hidden sm:inline">· available for work ·</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">28.6° N, 77.2° E</span>
          <span className="hidden md:inline">·</span>
          <span>IST {time || '--:--:--'}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
