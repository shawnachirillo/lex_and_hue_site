import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      id="footer"
      className="flex flex-col gap-6 bg-ink px-5 py-8 text-bone md:flex-row md:items-end md:justify-between md:px-10"
    >
      <Link
        href="/"
        className="text-[14px] font-black"
      >
        LEX & HUE
      </Link>

      <div className="text-[12px] uppercase text-white/55">
        Strategy / Identity / Digital / Relaunch
      </div>
    </footer>
  );
}