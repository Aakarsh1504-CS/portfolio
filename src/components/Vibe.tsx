'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { useEffect, useState } from 'react';

const SCRIPT = [
  { p: 'intent', t: 'build a portfolio that doesn\'t look like a template' },
  { p: 'plan',   t: 'sketch sections → choose stack → ship' },
  { p: 'gen',    t: 'next.js 15 + r3f + framer + tailwind v4' },
  { p: 'review', t: 'human-in-the-loop · diff every chunk' },
  { p: 'eval',   t: 'does it feel like me? if no → iterate' },
  { p: 'ship',   t: 'vercel deploy — preview → main' },
];

function TypingLine({ text, delay }: { text: string; delay: number }) {
  const [shown, setShown] = useState('');
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, 18);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay]);
  return <span>{shown}</span>;
}

const Vibe = () => {
  return (
    <section id="vibe" className="py-24 relative">
      {/* Background grid */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <SectionHeader
          num="05"
          kicker="./vibe-coding --watch"
          title="Pair-programming with a model."
          subtitle="Intent in, code out. Spec first. Eval second. Trust, but always review."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: the philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-lg text-[var(--fg)] text-balance leading-relaxed">
              The new workflow isn&apos;t prompt → answer. It&apos;s{' '}
              <span className="text-[var(--accent)]">spec</span> → draft →{' '}
              <span className="text-[var(--info)]">review</span> →{' '}
              <span className="text-[var(--warn)]">eval</span> → ship. The model
              writes; you direct, taste-test, and own the result.
            </p>

            <ul className="space-y-3 font-mono text-sm">
              {[
                { k: 'spec', v: 'a one-pager beats a vague prompt every time.' },
                { k: 'context', v: 'codebase > instructions. ground the model in the truth.' },
                { k: 'eval', v: 'diff-driven review. tests still gate the merge.' },
                { k: 'taste', v: 'the model has none. that\'s your job.' },
              ].map((row) => (
                <li
                  key={row.k}
                  className="flex gap-3 border-l border-[var(--line)] pl-4"
                >
                  <span className="text-[var(--accent)] uppercase tracking-widest text-[10px] w-16 shrink-0 pt-1">
                    {row.k}
                  </span>
                  <span className="text-[var(--fg-muted)]">{row.v}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {['Cursor', 'Claude', 'GPT', 'LangChain', 'evals', 'spec-driven'].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] uppercase tracking-wider border border-[var(--line)] text-[var(--fg-muted)] px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: the fake live session */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="border border-[var(--line-strong)] bg-black/50 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--line)] bg-[var(--bg-soft)]/60 font-mono text-[10px] uppercase tracking-widest">
                <span className="text-[var(--fg-muted)]">vibe.session</span>
                <span className="flex items-center gap-2 text-[var(--accent)]">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse" />
                  recording
                </span>
              </div>

              <div className="p-6 font-mono text-sm leading-relaxed space-y-2">
                <div className="text-[var(--fg-dim)]">
                  $ vibe init --target &quot;portfolio.v2&quot;
                </div>
                {SCRIPT.map((line, i) => (
                  <div key={line.p} className="flex gap-3 items-start">
                    <span className="text-[var(--accent)] w-16 shrink-0 uppercase tracking-widest text-[10px] pt-0.5">
                      {line.p}
                    </span>
                    <span className="text-[var(--fg)]">
                      <TypingLine text={line.t} delay={400 * i} />
                    </span>
                  </div>
                ))}
                <div className="pt-4 text-[var(--fg-muted)] flex items-center gap-2">
                  <span className="text-[var(--accent)]">✓</span>
                  <TypingLine text="session complete. shipped in &lt; 1 day." delay={400 * SCRIPT.length + 200} />
                  <span className="blink text-[var(--accent)]">▌</span>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-[var(--line)] bg-[var(--bg-soft)]/50 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-[var(--fg-dim)]">
                <span>diff: +1,247 / -312</span>
                <span>review: human ✓</span>
                <span>status: <span className="text-[var(--accent)]">merged</span></span>
              </div>
            </div>

            <div className="mt-4 font-mono text-[11px] text-[var(--fg-dim)] flex items-center gap-2">
              <span className="text-[var(--accent)]">▸</span>
              this site itself was vibed — same loop, real diffs.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Vibe;
