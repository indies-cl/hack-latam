import { Accordion } from "@base-ui/react/accordion";

interface TrackItem {
  readonly name: string;
  readonly tagline: string;
  readonly whatIsIt: string;
  readonly whatFits: readonly string[];
  readonly whatDoesntFit: readonly string[];
}

interface Props {
  readonly items: readonly TrackItem[];
  readonly whatIsItLabel: string;
  readonly whatFitsLabel: string;
  readonly whatDoesntFitLabel: string;
}

const trackColors = ["text-pink-dim", "text-jade-dim", "text-indigo-dim"] as const;
const trackSlugs = ["transparency-corruption", "environment-climate", "def-acc"] as const;

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="currentcolor"
      className="w-4 h-4 shrink-0 transition-transform duration-200 ease-out"
      aria-hidden
    >
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TracksAccordion({ items, whatIsItLabel, whatFitsLabel, whatDoesntFitLabel }: Props) {
  return (
    <Accordion.Root className="border border-ui divide-y divide-ui">
      {items.map((track, i) => {
        const color = trackColors[i];
        return (
          <Accordion.Item key={i} value={trackSlugs[i]} id={trackSlugs[i]}>
            <Accordion.Header>
              <Accordion.Trigger className={`w-full flex items-center justify-between gap-4 py-4 px-4 text-left ${color} [&[data-panel-open]_svg]:rotate-180`}>
                <div>
                  <h2 className="font-serif text-2xl">{track.name}</h2>
                  <p className="font-serif text-xl opacity-70">{track.tagline}</p>
                </div>
                <ChevronIcon />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="overflow-hidden">
              <div className="px-4 pb-4 space-y-6 lowercase">
                <section className="space-y-2">
                  <h3 className={`font-serif text-xl ${color}`}>{whatIsItLabel}</h3>
                  <p className="text-tx-2">{track.whatIsIt}</p>
                </section>

                <section className="space-y-2">
                  <h3 className={`font-serif text-xl ${color}`}>{whatFitsLabel}</h3>
                  <ul className="text-tx-2 list-none [&_li]:leading-tight [&_li]:pl-4 [&_li]:relative [&_li]:before:content-['-'] [&_li]:before:absolute [&_li]:before:left-0">
                    {track.whatFits.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className={`font-serif text-xl ${color}`}>{whatDoesntFitLabel}</h3>
                  <ul className="text-tx-2 list-none [&_li]:leading-tight [&_li]:pl-4 [&_li]:relative [&_li]:before:content-['-'] [&_li]:before:absolute [&_li]:before:left-0">
                    {track.whatDoesntFit.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
