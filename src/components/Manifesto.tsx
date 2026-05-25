'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

const stats = [
  { value: 400, suffix: '+', label: 'DSA problems solved' },
  { value: 24, suffix: '/7', label: 'Production systems owned' },
  { value: 3, suffix: 'rd', label: 'Party payment integrations' },
  { value: 99.9, suffix: '%', label: 'Target uptime, no excuses', decimals: 1 },
];

function Counter({
  to,
  suffix,
  decimals = 0,
}: {
  to: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 1.6, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span className="text-[var(--accent)]">{suffix}</span>
    </span>
  );
}

const Manifesto = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-dim)] mb-6 flex items-center gap-3">
            <span className="text-[var(--accent)] section-num">00</span>
            <span className="w-8 h-px bg-[var(--line-strong)]" />
            <span>manifesto.md</span>
          </div>

          <h2 className="font-mono text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-balance">
            <span className="text-[var(--fg-dim)]">{'/*'}</span> I build systems that{' '}
            <span className="text-[var(--accent)]">move money</span>, verify identity,
            and stay up at <span className="text-[var(--info)]">3am</span>. The kind of
            code where a missed edge case is someone&apos;s actual rupee.{' '}
            <span className="text-[var(--fg-dim)]">{'*/'}</span>
          </h2>

          <p className="mt-6 text-[var(--fg-muted)] max-w-2xl text-balance">
            Currently obsessed with combining solid backend fundamentals — idempotency,
            partitioning, fault isolation — with the new LLM/RAG/agent stack. Vibe coding
            is the workflow, but the systems still have to survive Monday morning traffic.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[var(--bg)] p-6 md:p-8 group hover:bg-[var(--bg-soft)] transition-colors"
            >
              <div className="font-mono text-3xl md:text-5xl font-semibold tracking-tight text-[var(--fg)]">
                <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-[var(--fg-muted)]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
