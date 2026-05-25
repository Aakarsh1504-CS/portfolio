'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  live: string;
  repo: string;
  accent: string;
  span?: string;
};

const projects: Project[] = [
  {
    id: 'codeleela',
    name: 'CodeLeela',
    tagline: 'a coder\'s social network',
    description:
      'JWT-auth\'d social platform for devs. Post, share, upload images. Inspired by Krishna ji.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Multer', 'JWT'],
    live: 'https://code-leela.onrender.com',
    repo: 'https://github.com/Aakarsh1504-CS/code-leela',
    accent: 'from-[#00ff9c]/15',
    span: 'md:col-span-2',
  },
  {
    id: 'take-note',
    name: 'Take Note',
    tagline: 'notes with intent',
    description:
      'Session-authenticated note app with full CRUD. Minimal, fast, mine.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    live: 'https://take-note-pwjf.onrender.com/login',
    repo: 'https://github.com/Aakarsh1504-CS/take-note',
    accent: 'from-[#6ea8ff]/15',
  },
  {
    id: 'movie-search',
    name: 'Movie Search',
    tagline: 'OMDB-powered discovery',
    description:
      'Clean search UI for movies. Single-page, instant feedback, snappy.',
    tech: ['HTML', 'CSS', 'JavaScript', 'OMDB API'],
    live: 'https://aakarsh-projects-api-movie.on.drv.tw/dets/',
    repo: 'https://github.com/Aakarsh1504-CS/MOVIE-SEARCH',
    accent: 'from-[#ffb020]/15',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-[var(--bg)]">
      <div className="container mx-auto px-4">
        <SectionHeader
          num="06"
          kicker="./ship.list"
          title="Things I've shipped."
          subtitle="A small set, deliberately. Each one taught me something I still use."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)]">
          {projects.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative bg-[var(--bg)] p-6 md:p-8 tilt-card group overflow-hidden ${
                p.span ?? ''
              }`}
            >
              <div
                className={`absolute -inset-px bg-gradient-to-br ${p.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
              />

              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-dim)]">
                    proj_0{i + 1} {'//'} {p.id}
                  </div>
                  <FaArrowRight className="text-[var(--fg-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">
                  {p.name}
                </h3>
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-4">
                  {p.tagline}
                </div>

                <p className="text-[var(--fg-muted)] mb-6 max-w-xl">
                  {p.description}
                </p>

                <div className="mt-auto flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-wider border border-[var(--line)] text-[var(--fg-muted)] px-2 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(p.repo, '_blank', 'noopener,noreferrer');
                      }}
                      className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`${p.name} repository`}
                    >
                      <FaGithub className="text-lg" />
                    </span>
                    <span
                      className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                      aria-label={`${p.name} live`}
                    >
                      <FaExternalLinkAlt className="text-sm" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}

          {/* Last cell: more coming */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative bg-[var(--bg)] p-6 md:p-8 flex flex-col justify-center items-start"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-dim)] mb-4">
              proj_04 {'//'} wip
            </div>
            <div className="font-mono text-2xl text-[var(--fg-muted)]">
              <span className="text-[var(--accent)]">$</span> next.<span className="blink">▌</span>
            </div>
            <p className="mt-3 text-[var(--fg-muted)] text-sm">
              Currently cooking an LLM-powered tool. DM if curious.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
