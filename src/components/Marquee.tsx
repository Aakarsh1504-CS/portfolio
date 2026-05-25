'use client';

const Marquee = ({ items }: { items: string[] }) => {
  const loop = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden border-y border-[var(--line)] bg-[var(--bg-soft)]/40 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent z-10" />
      <div className="flex whitespace-nowrap animate-marquee">
        {loop.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm md:text-base uppercase tracking-widest text-[var(--fg-muted)] mx-8 flex items-center gap-8"
          >
            {item}
            <span className="text-[var(--accent)]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
