'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

type Exp = {
  hash: string;
  branch?: string;
  title: string;
  company: string;
  period: string;
  type: string;
  points: string[];
  stack: string[];
};

const experiences: Exp[] = [
  {
    hash: 'a4f2c91',
    branch: 'HEAD -> career, origin/current',
    title: 'Backend Developer',
    company: 'FanCraze',
    period: 'Nov 2024 - Present',
    type: 'Onsite',
    points: [
      'Engineered production-grade finance + KYC modules processing sensitive user data',
      'Integrated multiple third-party payment gateways with idempotent retries and exhaustive error mapping',
      'Cryptographic handling of financial identifiers and tokens; designed audit-friendly logs',
      'Shipped scalable low-latency APIs supporting real-time wallet/balance updates',
      'Built monitoring, alerting, and on-call runbooks for 24/7 availability',
    ],
    stack: ['Node.js', 'Postgres', 'Redis', 'Aerospike', 'Kafka', 'AWS'],
  },
  {
    hash: '7b1d8e0',
    title: 'Software Engineering Intern',
    company: 'DesiQna',
    period: 'Jun 2023 - Aug 2023',
    type: 'Remote',
    points: [
      'Implemented responsive frontend + backend features for auth, Q&A, and user dashboard',
      'Hardened authentication flow; improved platform reliability under traffic spikes',
    ],
    stack: ['Node.js', 'MongoDB', 'React'],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-[var(--bg)]">
      <div className="container mx-auto px-4">
        <SectionHeader
          num="03"
          kicker="git log --career"
          title="Commit history."
          subtitle="A short, honest log of where I've shipped. No filler, no exaggerations."
        />

        <div className="font-mono text-sm md:text-[15px]">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.hash}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative border border-[var(--line)] bg-[var(--bg-soft)]/40 p-6 md:p-8 mb-6 hover:border-[var(--line-strong)] transition-colors"
            >
              <div className="text-[var(--fg-dim)] leading-relaxed">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[var(--warn)]">commit</span>
                  <span className="text-[var(--fg-muted)]">{exp.hash}</span>
                  {exp.branch && (
                    <span className="text-[var(--fg-dim)]">
                      ({' '}
                      <span className="text-[var(--accent)]">{exp.branch.split(',')[0]}</span>
                      <span>, {exp.branch.split(',').slice(1).join(',').trim()}</span>
                      {' )'}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[var(--fg-muted)]">Author:</span>{' '}
                  <span className="text-[var(--fg)]">Aakarsh Arora &lt;aroraaakarsh0@gmail.com&gt;</span>
                </div>
                <div>
                  <span className="text-[var(--fg-muted)]">Date:</span>{' '}
                  <span className="text-[var(--fg)]">{exp.period}</span>{' '}
                  <span className="text-[var(--fg-dim)]">· {exp.type}</span>
                </div>
              </div>

              <div className="mt-5 pl-6 border-l border-[var(--line)]">
                <div className="text-lg md:text-xl text-[var(--fg)] font-sans font-semibold tracking-tight">
                  {exp.title}{' '}
                  <span className="text-[var(--accent)] font-mono text-base">
                    @ {exp.company}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 font-sans text-[var(--fg-muted)]">
                  {exp.points.map((p, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-[var(--accent)] font-mono select-none">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] uppercase tracking-wider border border-[var(--line)] text-[var(--fg-muted)] px-2 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          <div className="text-[var(--fg-dim)] font-mono text-xs mt-4">
            <span className="text-[var(--accent)]">$</span> git log --reverse · showing
            most recent first · <span className="blink">▌</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
