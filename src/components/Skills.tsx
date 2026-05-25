'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import Marquee from './Marquee';
import {
  FaJava,
  FaNodeJs,
  FaPython,
  FaAws,
  FaDocker,
  FaGitAlt,
} from 'react-icons/fa';
import {
  SiGo,
  SiRedis,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiApachekafka,
  SiTypescript,
  SiLangchain,
  SiOpenai,
} from 'react-icons/si';

type Card = {
  span?: string;
  title: string;
  kicker: string;
  icon?: React.ComponentType<{ className?: string }>;
  body: React.ReactNode;
  tags: string[];
  glow?: string;
};

const cards: Card[] = [
  {
    span: 'md:col-span-2 md:row-span-2',
    title: 'AI / LLM stack',
    kicker: '// the new frontier',
    icon: SiLangchain,
    glow: 'from-[#00ff9c]/20 to-transparent',
    body: (
      <>
        <p>
          Building <span className="text-[var(--accent)]">RAG pipelines</span>,
          tool-using agents, and embedding-driven search.
        </p>
        <p className="mt-2 text-[var(--fg-muted)]">
          LangChain + vector stores + structured outputs. Treating prompts like
          contracts and evals like tests.
        </p>
      </>
    ),
    tags: ['LangChain', 'RAG', 'LLMs', 'Embeddings', 'Vector DBs', 'OpenAI', 'Claude'],
  },
  {
    title: 'Languages',
    kicker: '// daily drivers',
    body: (
      <div className="flex flex-wrap gap-3 mt-1">
        {[
          { i: FaJava, l: 'Java' },
          { i: SiGo, l: 'Go' },
          { i: FaNodeJs, l: 'Node.js' },
          { i: SiTypescript, l: 'TS' },
          { i: FaPython, l: 'Python' },
        ].map(({ i: Icon, l }) => (
          <span
            key={l}
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)]"
          >
            <Icon className="text-base text-[var(--fg)]" /> {l}
          </span>
        ))}
      </div>
    ),
    tags: [],
  },
  {
    title: 'Datastores',
    kicker: '// pick the right hammer',
    body: (
      <div className="flex flex-wrap gap-3 mt-1">
        {[
          { i: SiPostgresql, l: 'Postgres' },
          { i: SiMongodb, l: 'MongoDB' },
          { i: SiRedis, l: 'Redis' },
          { i: SiMysql, l: 'MySQL' },
        ].map(({ i: Icon, l }) => (
          <span
            key={l}
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)]"
          >
            <Icon className="text-base text-[var(--fg)]" /> {l}
          </span>
        ))}
        <span className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)]">
          <span className="w-4 h-4 rounded-sm bg-gradient-to-br from-red-500 to-orange-500" />
          Aerospike
        </span>
      </div>
    ),
    tags: [],
  },
  {
    title: 'Vibe coding',
    kicker: '// AI as a pair',
    icon: SiOpenai,
    glow: 'from-[#ff4d6d]/15 to-transparent',
    body: (
      <p className="text-[var(--fg-muted)]">
        Cursor + Claude + spec-driven prompting. Intent in, working code out — then
        review it like any other PR.
      </p>
    ),
    tags: ['Cursor', 'Claude', 'spec→code', 'eval-driven'],
  },
  {
    title: 'Infra & Ops',
    kicker: '// keep the lights on',
    body: (
      <div className="flex flex-wrap gap-3 mt-1">
        {[
          { i: FaAws, l: 'AWS' },
          { i: FaDocker, l: 'Docker' },
          { i: SiApachekafka, l: 'Kafka' },
          { i: FaGitAlt, l: 'Git' },
        ].map(({ i: Icon, l }) => (
          <span
            key={l}
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)]"
          >
            <Icon className="text-base text-[var(--fg)]" /> {l}
          </span>
        ))}
      </div>
    ),
    tags: [],
  },
  {
    title: 'Financial systems',
    kicker: '// the day job',
    glow: 'from-[#6ea8ff]/15 to-transparent',
    body: (
      <p className="text-[var(--fg-muted)]">
        Payments, KYC automation, fraud signals, idempotent retries, audit trails.
        Cryptographic handling of identifiers and tokens.
      </p>
    ),
    tags: ['Payments', 'KYC', 'Fraud', 'Idempotency'],
  },
];

const marqueeItems = [
  'JAVA',
  'GO',
  'NODE.JS',
  'POSTGRES',
  'MONGODB',
  'REDIS',
  'AEROSPIKE',
  'KAFKA',
  'AWS',
  'DOCKER',
  'LANGCHAIN',
  'LLM',
  'RAG',
  'VECTOR DB',
  'EMBEDDINGS',
  'VIBE CODING',
];

const Skills = () => {
  return (
    <section id="arsenal" className="py-24">
      <Marquee items={marqueeItems} />

      <div className="container mx-auto px-4 mt-20">
        <SectionHeader
          num="02"
          kicker="arsenal.json"
          title="The stack I reach for."
          subtitle="Bias toward boring, battle-tested infra at the core — with the LLM/agent layer on top."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)]">
          {cards.map((c) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
              className={`relative overflow-hidden bg-[var(--bg)] p-6 md:p-8 tilt-card group ${
                c.span ?? ''
              }`}
            >
              {/* Glow */}
              {c.glow && (
                <div
                  className={`absolute -inset-px bg-gradient-to-br ${c.glow} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                />
              )}

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-dim)]">
                    {c.kicker}
                  </div>
                  {c.icon && (
                    <c.icon className="text-xl text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors" />
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
                  {c.title}
                </h3>

                <div className="text-[var(--fg)]">{c.body}</div>

                {c.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-wider border border-[var(--line)] text-[var(--fg-muted)] px-2 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
