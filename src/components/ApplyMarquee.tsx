import { Marquee } from "./Marquee"

interface Props {
  word?: string;
}

const TALLY_URL = "https://tally.so/r/dWYX7o";

export default function ApplyMarquee({ word = "participa" }: Props) {
  return (
    <a
      href={TALLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="sticky top-0 left-0 right-0 z-50 w-full min-w-full bg-tx text-bg border-b border-[#e0dfdc] cursor-pointer hover:bg-[#f0efec] transition-colors text-left block"
      aria-label={word}
    >
      <Marquee className="py-2 px-0 [--gap:2rem] [--duration:10s]">
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
    </a>
  )
}
