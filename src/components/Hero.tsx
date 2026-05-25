'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaGithub, FaLinkedin, FaDownload, FaArrowRight } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { TypeAnimation } from 'react-type-animation';

const SceneCanvas = dynamic(() => import('./SceneCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="font-mono text-xs text-[var(--fg-dim)]">
        <span className="text-[var(--accent)]">▸</span> initializing geometry…
      </div>
    </div>
  ),
});

const Hero = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Faint grid backdrop */}
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left text block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Kicker */}
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-dim)] mb-6 flex items-center gap-2">
              <span className="text-[var(--accent)]">{'>'}</span>
              <span>./aakarsh --whoami</span>
              <span className="blink text-[var(--accent)]">▌</span>
            </div>

            {/* Name */}
            <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mb-4">
              <span
                className="block glitch text-[var(--fg)]"
                data-text="AAKARSH"
              >
                AAKARSH
              </span>
              <span className="block text-sweep">ARORA.</span>
            </h1>

            {/* Rotating title */}
            <div className="text-lg md:text-2xl font-mono text-[var(--fg-muted)] mb-8 min-h-[2em]">
              <span className="text-[var(--accent)]">$</span>{' '}
              <TypeAnimation
                sequence={[
                  'building payment rails.',
                  1800,
                  'automating KYC at scale.',
                  1800,
                  'wrangling LLMs + RAG pipelines.',
                  1800,
                  'vibe coding at 3am.',
                  1800,
                  'shipping production systems.',
                  1800,
                ]}
                speed={55}
                repeat={Infinity}
                cursor
              />
            </div>

            {/* Description */}
            <p className="text-[var(--fg-muted)] max-w-xl text-balance mb-10">
              Backend engineer building secure, high-volume financial systems and
              LLM-powered tooling. I obsess over throughput, idempotency, and the
              tiny details no one notices until they break.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-[var(--accent)] text-black font-mono text-sm uppercase tracking-wider px-5 py-3 hover:bg-white transition-colors"
              >
                let&apos;s build something
                <FaArrowRight />
              </motion.a>
              <motion.a
                href="/resumee.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 border border-[var(--line-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] font-mono text-sm uppercase tracking-wider px-5 py-3 transition-all"
              >
                <FaDownload />
                resume.pdf
              </motion.a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5 text-xl">
              {[
                {
                  href: 'https://github.com/Aakarsh1504-CS',
                  icon: FaGithub,
                  label: 'github',
                },
                {
                  href: 'https://www.linkedin.com/in/aakarsh-arora-b3965822b/',
                  icon: FaLinkedin,
                  label: 'linkedin',
                },
                {
                  href: 'https://leetcode.com/u/Aakarsh_1504/',
                  icon: SiLeetcode,
                  label: 'leetcode',
                },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                  aria-label={s.label}
                >
                  <s.icon />
                </motion.a>
              ))}
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-dim)] ml-2">
                {'//'} dm&apos;s open
              </div>
            </div>
          </motion.div>

          {/* Right 3D scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-square w-full max-w-[520px] mx-auto corners">
              <div className="absolute inset-0">
                <SceneCanvas />
              </div>
              {/* Corner labels — architecture diagram */}
              <div className="absolute top-2 left-2 font-mono text-[10px] uppercase tracking-widest text-[var(--fg-dim)]">
                arch.live // service-mesh
              </div>
              <div className="absolute top-2 right-2 font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse" />
                healthy
              </div>
              <div className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-[var(--fg-dim)]">
                p99 · 18ms
              </div>
              <div className="absolute bottom-2 right-2 font-mono text-[10px] uppercase tracking-widest text-[var(--fg-dim)]">
                nodes · 6 · all green
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--fg-dim)]"
        >
          <span>scroll</span>
          <span className="w-px h-8 bg-gradient-to-b from-[var(--accent)] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
