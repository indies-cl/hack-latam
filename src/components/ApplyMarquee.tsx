import { Marquee } from "./Marquee"

export default function ApplyMarquee() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("participate-open"))}
      className="sticky top-0 left-0 right-0 z-50 w-full min-w-full bg-tx text-bg border-b border-[#e0dfdc] cursor-pointer hover:bg-[#f0efec] transition-colors text-left"
      aria-label="participa en la hackathon"
    >
      <Marquee className="py-2 [--gap:2rem] [--duration:10s]">
        {["participa", "participa", "participa", "participa", "participa", "participa"].map(
          (word, i) => (
            <span
              key={i}
              className="font-sans whitespace-nowrap lowercase"
            >
              {word} •
            </span>
          ),
        )}
      </Marquee>
    </button>
  )
}
