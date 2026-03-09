import { useEffect, useState } from "react";

const TARGET = new Date("2026-04-15T22:00:00Z"); // April 15, 6PM UTC-4

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

interface Props {
  lang?: "en" | "es";
}

export default function Countdown({ lang = "es" }: Props) {
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

  const labels =
    lang === "en"
      ? { d: "Days", h: "Hours", m: "Minutes", s: "Seconds" }
      : { d: "Días", h: "Horas", m: "Minutos", s: "Segundos" };

  return (
    <div className="text-tx flex gap-2 md:gap-4 tabular-nums">
      <span className="flex flex-col items-center">
        <span className="font-sans text-3xl md:text-5xl">{pad(diff.days)}</span>
        <span className="font-mono text-tx-2 text-xs">{labels.d}</span>
      </span>
      <span className="flex flex-col items-center">
        <span className="font-sans text-3xl md:text-5xl">{pad(diff.hours)}</span>
        <span className="font-mono text-tx-2 text-xs">{labels.h}</span>
      </span>
      <span className="flex flex-col items-center">
        <span className="font-sans text-3xl md:text-5xl">{pad(diff.minutes)}</span>
        <span className="font-mono text-tx-2 text-xs">{labels.m}</span>
      </span>
      <span className="flex flex-col items-center">
        <span className="font-sans text-3xl md:text-5xl">{pad(diff.seconds)}</span>
        <span className="font-mono text-tx-2 text-xs">{labels.s}</span>
      </span>
    </div>
  );
}
