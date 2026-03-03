const TALLY_URL = "https://tally.so/r/dWYX7o";

interface Props {
  participateLabel?: string;
}

export default function Header({
  participateLabel
}: Props) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between p-8 border-b border-ui bg-bg">
      <span className="text-7xl font-sans">hack@latam</span>
      <a
        href={TALLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-tx text-bg py-4 px-8 border border-ui rounded-none font-serif hover:border-ui-2 transition-colors"
      >
        {participateLabel}
      </a>
    </header>
  );
}
