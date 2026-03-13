import { useState } from "react";

interface Community {
  readonly logo: string;
  readonly name: string;
}

interface Props {
  communities: readonly Community[];
}

const REPEAT = 4;

export default function CommunitiesMarquee({ communities }: Props) {
  const [isPaused, setIsPaused] = useState(false);
  const items = [...communities, ...communities];
  return (
    <div
      className="relative h-[200px] w-full overflow-hidden marquee-fade-edges"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex h-full overflow-hidden">
        {Array(REPEAT)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              aria-hidden={i > 0}
              className="flex shrink-0 flex-row gap-4 animate-communities-marquee pr-4"
              style={{
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {items.map((c, j) => (
                <div
                  key={`${c.name}-${i}-${j}`}
                  className="flex h-[100px] shrink-0 items-center justify-center overflow-hidden"
                >
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="h-[100px] w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
