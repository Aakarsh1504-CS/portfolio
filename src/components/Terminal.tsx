'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

type Line = {
  kind: 'in' | 'out' | 'sys' | 'err';
  text: string;
};

const PROMPT = 'visitor@aakarsh.dev';
const CWD = '~/portfolio';

const HELP_LINES: string[] = [
  'available commands:',
  '  help              show this menu',
  '  whoami            who is this guy',
  '  skills            tech arsenal',
  '  experience        career log',
  '  projects          ship list',
  '  contact           how to reach me',
  '  vibe              what is vibe coding',
  '  stack             one-line per layer',
  '  ls                list sections',
  '  date              server time',
  '  echo <text>       repeat it back',
  '  joke              dev humour',
  '  coffee            ☕',
  '  sudo <cmd>        try me',
  '  clear             wipe the screen',
];

const RESPONSES: Record<string, string[] | ((arg: string) => string[])> = {
  help: HELP_LINES,
  whoami: [
    'aakarsh arora',
    '  role:     backend engineer · ai systems',
    '  org:      FanCraze (since nov 2024)',
    '  focus:    payments, kyc, llm-powered tooling',
    '  location: india · ist',
    '  status:   shipping & vibing',
  ],
  skills: [
    'languages   : java, go, node.js, typescript, python',
    'datastores  : postgres, mongodb, redis, aerospike, mysql',
    'ai stack    : langchain, rag, llms, embeddings, vector dbs',
    'infra       : aws, docker, kafka, git',
    'principles  : idempotency, audit logs, eval-driven dev',
  ],
  experience: [
    'FanCraze            backend dev          nov 2024 - now',
    '  → finance/kyc modules, payment integrations, real-time wallet',
    'DesiQna             swe intern           jun 2023 - aug 2023',
    '  → auth flow, q&a platform, reliability work',
    '',
    'tip: run "experience --verbose" by scrolling up to section 03.',
  ],
  projects: [
    'codeleela     - social platform for coders     [node · mongo · jwt]',
    'take-note     - notes app with session auth    [node · express · mongo]',
    'movie-search  - omdb-powered search ui         [html · css · js]',
    '',
    'live previews + repo links in section 06.',
  ],
  contact: [
    '✉  aroraaakarsh0@gmail.com',
    '↗  linkedin.com/in/aakarsh-arora-b3965822b',
    '↗  github.com/Aakarsh1504-CS',
    '↗  leetcode.com/u/Aakarsh_1504',
    '',
    'or just fill the form in section 07.',
  ],
  vibe: [
    '"vibe coding" /vībˌkōdiNG/  n.',
    '  the act of pairing with an llm so tightly that intent → code',
    '  feels like a single keystroke. spec first, eval second,',
    '  ship third. the model is a junior engineer who never sleeps.',
    '',
    '  stack: cursor + claude/gpt + langchain + a clear spec.',
    '  rule:  trust, but always review. tests don\'t lie.',
  ],
  stack: [
    'edge       :  next.js 15 · vercel',
    'service    :  node + go for hot paths',
    'data       :  postgres (truth) · redis (cache) · aerospike (latency)',
    'ai         :  langchain · rag · embeddings',
    'observe    :  logs · metrics · traces · pagerduty',
  ],
  ls: ['about/  arsenal/  experience/  lab/  vibe/  projects/  contact/'],
  coffee: [
    '       ( (',
    '        ) )',
    '     .______.',
    '     |      |]   brewing intent → ',
    '     \\      /    pouring caffeine → ',
    '      `----\'     output: code that ships.',
  ],
  joke: [
    'q: how many backend devs does it take to change a lightbulb?',
    'a: none. that\'s a frontend concern.',
  ],
};

function runCommand(raw: string): Line[] {
  const cmd = raw.trim();
  if (!cmd) return [];

  // echo
  if (cmd.startsWith('echo ')) {
    return [{ kind: 'out', text: cmd.slice(5) }];
  }

  // sudo
  if (cmd.startsWith('sudo')) {
    return [
      { kind: 'err', text: 'permission denied. nice try though.' },
      { kind: 'out', text: 'this incident has been logged. (it has not.)' },
    ];
  }

  // date
  if (cmd === 'date') {
    return [{ kind: 'out', text: new Date().toString() }];
  }

  // clear handled by caller
  if (cmd === 'clear' || cmd === 'cls') {
    return [{ kind: 'sys', text: '__CLEAR__' }];
  }

  const r = RESPONSES[cmd];
  if (Array.isArray(r)) return r.map((t) => ({ kind: 'out', text: t }));
  if (typeof r === 'function') return r('').map((t) => ({ kind: 'out', text: t }));

  return [
    { kind: 'err', text: `command not found: ${cmd}` },
    { kind: 'out', text: 'type "help" for the menu.' },
  ];
}

const BOOT_LINES: Line[] = [
  { kind: 'sys', text: 'aakarsh.dev v1.04 // booting...' },
  { kind: 'sys', text: '  ✓ memory ok · 16gb · ddr5' },
  { kind: 'sys', text: '  ✓ caffeine reserves: nominal' },
  { kind: 'sys', text: '  ✓ context window: 1M tokens' },
  { kind: 'sys', text: '  ✓ vibe sync: connected' },
  { kind: 'sys', text: '' },
  { kind: 'sys', text: 'welcome. type "help" to explore.' },
  { kind: 'sys', text: '' },
];

const Terminal = () => {
  const [lines, setLines] = useState<Line[]>(BOOT_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const submit = useCallback(() => {
    const raw = input;
    const echoed: Line = { kind: 'in', text: raw };
    const out = runCommand(raw);

    if (out.length === 1 && out[0].text === '__CLEAR__') {
      setLines([]);
    } else {
      setLines((prev) => [...prev, echoed, ...out]);
    }

    if (raw.trim()) {
      setHistory((h) => [raw, ...h].slice(0, 50));
    }
    setHIdx(-1);
    setInput('');
  }, [input]);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      if (next >= 0 && history[next] !== undefined) {
        setHIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(hIdx - 1, -1);
      setHIdx(next);
      setInput(next === -1 ? '' : history[next]);
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([]);
    }
  };

  const focus = () => inputRef.current?.focus();

  const quickCmds = ['help', 'whoami', 'skills', 'projects', 'vibe', 'coffee', 'clear'];

  return (
    <section id="lab" className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          num="04"
          kicker="./lab --interactive"
          title="Open a shell."
          subtitle="A real terminal. Try help, whoami, skills, vibe — or sudo something."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          onClick={focus}
          className="border border-[var(--line-strong)] bg-black/60 backdrop-blur-sm shadow-[0_0_40px_rgba(0,255,156,0.05)] overflow-hidden font-mono text-[13px] md:text-sm cursor-text"
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--line)] bg-[var(--bg-soft)]/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--fg-muted)]">
              {PROMPT}: {CWD} — zsh
            </div>
            <div className="text-[10px] text-[var(--fg-dim)]">80×24</div>
          </div>

          {/* Output */}
          <div
            ref={scrollRef}
            className="px-4 py-4 h-[420px] overflow-y-auto leading-relaxed"
          >
            {lines.map((l, i) => {
              if (l.kind === 'in') {
                return (
                  <div key={i} className="text-[var(--fg)]">
                    <span className="text-[var(--accent)]">{PROMPT}</span>
                    <span className="text-[var(--fg-dim)]">:</span>
                    <span className="text-[var(--info)]">{CWD}</span>
                    <span className="text-[var(--fg-dim)]">$ </span>
                    <span>{l.text}</span>
                  </div>
                );
              }
              if (l.kind === 'sys') {
                return (
                  <div key={i} className="text-[var(--fg-muted)] whitespace-pre">
                    {l.text}
                  </div>
                );
              }
              if (l.kind === 'err') {
                return (
                  <div key={i} className="text-[var(--danger)] whitespace-pre">
                    {l.text}
                  </div>
                );
              }
              return (
                <div key={i} className="text-[var(--fg)] whitespace-pre">
                  {l.text}
                </div>
              );
            })}

            {/* Input line */}
            <div className="flex items-center text-[var(--fg)] mt-1">
              <span className="text-[var(--accent)]">{PROMPT}</span>
              <span className="text-[var(--fg-dim)]">:</span>
              <span className="text-[var(--info)]">{CWD}</span>
              <span className="text-[var(--fg-dim)]">$&nbsp;</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                aria-label="terminal input"
                className="flex-1 bg-transparent outline-none border-none text-[var(--fg)] font-mono caret-[var(--accent)]"
              />
            </div>
          </div>

          {/* Quick-pick chips */}
          <div className="px-4 py-3 border-t border-[var(--line)] bg-[var(--bg-soft)]/50 flex flex-wrap gap-2">
            {quickCmds.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setInput(c);
                  setTimeout(() => {
                    setInput(c);
                    submit();
                  }, 0);
                }}
                className="text-[11px] uppercase tracking-widest border border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--fg-muted)] px-2 py-1 transition-colors"
              >
                {c}
              </button>
            ))}
            <div className="ml-auto text-[10px] uppercase tracking-widest text-[var(--fg-dim)] flex items-center">
              ↑↓ history · ⌘L clear
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;
