import { Marquee } from "./Marquee"

interface Props {
  word?: string;
}

export default function ApplyMarquee({ word = "participa" }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("participate-open"))}
      className="sticky top-0 left-0 right-0 z-50 w-full min-w-full bg-tx text-bg border-b border-[#e0dfdc] cursor-pointer hover:bg-[#f0efec] transition-colors text-left"
      aria-label={word}
    >
      <Marquee className="py-2 [--gap:2rem] [--duration:10s]">
        {[word, word, word, word, word, word].map(
          (w, i) => (
            <span
              key={i}
              className="font-sans whitespace-nowrap lowercase"
            >
              {w} •
            </span>
          ),
        )}
      </Marquee>
    </button>
  )
}
