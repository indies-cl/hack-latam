import { Accordion } from "@base-ui/react/accordion";

export interface FAQItem {
  readonly q: string;
  readonly a: string;
  readonly link?: { readonly text: string; readonly href: string };
  readonly after?: string;
}

interface Props {
  readonly title: string;
  readonly items: readonly FAQItem[];
}

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

export default function FAQAccordion({ title, items }: Props) {
  return (
    <section id="faq" className="max-w-3xl mx-auto space-y-4 scroll-mt-8 lowercase">
      <p className="text-tx">{title}</p>
      <Accordion.Root multiple className="border border-ui divide-y divide-ui">
        {items.map((item, i) => (
          <Accordion.Item key={i} value={String(i)}>
            <Accordion.Header>
              <Accordion.Trigger className="w-full flex items-center justify-between gap-4 py-4 px-4 text-left text-tx [&[data-panel-open]_svg]:rotate-180">
                <span>{item.q}</span>
                <ChevronIcon />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="overflow-hidden">
              <div className="px-4 pb-4 text-tx-2">
                {item.a}
                {item.link ? (
                  <>
                    <a href={item.link.href} className="underline text-tx hover:text-tx-2">
                      {item.link.text}
                    </a>
                    {item.after}
                  </>
                ) : null}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
