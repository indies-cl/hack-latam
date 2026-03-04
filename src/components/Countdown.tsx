"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-05-15T22:00:00Z"); // 6PM UTC-4

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function Countdown() {
  const [diff, setDiff] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ms = TARGET.getTime() - now.getTime();
      if (ms <= 0) {
        setDiff({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const s = Math.floor(ms / 1000) % 60;
      const m = Math.floor(ms / 60000) % 60;
      const h = Math.floor(ms / 3600000) % 24;
      const d = Math.floor(ms / 86400000);
      setDiff({ days: d, hours: h, minutes: m, seconds: s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (diff === null) return null;

  return (
    <div className="font-mono text-og flex gap-2 md:gap-4 tabular-nums">
      <span className="flex flex-col items-center">
        <span className="text-2xl md:text-4xl">{pad(diff.days)}</span>
        <span className="text-tx-2 text-xs uppercase">d</span>
      </span>
      <span className="flex flex-col items-center">
        <span className="text-2xl md:text-4xl">{pad(diff.hours)}</span>
        <span className="text-tx-2 text-xs uppercase">h</span>
      </span>
      <span className="flex flex-col items-center">
        <span className="text-2xl md:text-4xl">{pad(diff.minutes)}</span>
        <span className="text-tx-2 text-xs uppercase">m</span>
      </span>
      <span className="flex flex-col items-center">
        <span className="text-2xl md:text-4xl">{pad(diff.seconds)}</span>
        <span className="text-tx-2 text-xs uppercase">s</span>
      </span>
    </div>
  );
}
