'use client';

import { motion } from 'framer-motion';

type Props = {
  num: string;
  kicker: string;
  title: string;
  subtitle?: string;
};

const SectionHeader = ({ num, kicker, title, subtitle }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="mb-12 flex items-end justify-between gap-6 border-b border-[var(--line)] pb-6"
    >
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-dim)] mb-3 flex items-center gap-2">
          <span className="text-[var(--accent)] section-num">{num}</span>
          <span className="w-8 h-px bg-[var(--line-strong)]" />
          <span>{kicker}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-[var(--fg-muted)] max-w-2xl text-balance">{subtitle}</p>
        )}
      </div>
      <div className="hidden md:block font-mono text-[10px] uppercase tracking-widest text-[var(--fg-dim)] text-right">
        <div>// scroll</div>
        <div className="mt-1">↓</div>
      </div>
    </motion.div>
  );
};

export default SectionHeader;
