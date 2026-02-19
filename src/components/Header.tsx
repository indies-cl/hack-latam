interface Props {
  participateLabel?: string;
}

export default function Header({
  participateLabel
}: Props) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between p-8 border-b border-ui bg-bg">
      <span className="text-7xl font-sans">hack@latam</span>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent("participate-open"))}
        className="bg-tx text-bg py-4 px-8 border border-ui rounded-none font-serif hover:border-ui-2 transition-colors"
      >
        {participateLabel}
      </button>
    </header>
  );
}
