import { useState } from "react";

interface Photo {
  readonly src: string;
  readonly subtitle: string;
  readonly rotate: number;
}

interface Props {
  photos: readonly Photo[];
}

export default function PhotoStack({ photos }: Props) {
  const [current, setCurrent] = useState(photos.length - 1);
  const total = photos.length;

  const next = () => setCurrent((c) => (c - 1 + total) % total);
  const prev = () => setCurrent((c) => (c + 1) % total);

  return (
    <section id="prev-events" className="space-y-4">
      <div className="relative h-96 w-full">
        {photos.map((photo, i) => {
          const offset = (i - current + total) % total;
          const zIndex = total - offset;
          const translateX = offset * 8;
          const translateY = offset * 8;
          const scale = 1 - offset * 0.02;

          return (
            <div
              key={i}
              className="absolute inset-0 transition-all duration-300"
              style={{
                zIndex,
                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${photo.rotate}deg)`,
                opacity: offset === 0 ? 1 : 0.7,
              }}
            >
              <div className="w-full h-full bg-tx p-4 border border-tx-2 flex flex-col">
                <img
                  src={photo.src}
                  alt={photo.subtitle}
                  className="w-full flex-1 min-h-0 object-cover"
                />
                <p className="text-bg text-center mt-2 shrink-0 text-base font-bold max-w-sm mx-auto text-balance">
                  {photo.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={prev}
          className="border border-ui px-4 py-2 hover:border-og hover:text-og"
        >
          ←
        </button>
        <button
          onClick={next}
          className="border border-ui px-4 py-2 hover:border-og hover:text-og"
        >
          →
        </button>
      </div>
    </section>
  );
}
