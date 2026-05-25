'use client';

import { useEffect, useState } from 'react';

const Footer = () => {
  const [time, setTime] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const upd = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
        })
      );
      setYear(d.getFullYear());
    };
    upd();
    const id = setInterval(upd, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-[var(--line)] mt-12 bg-[var(--bg-soft)]/30">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs">
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-[var(--fg-dim)]">
              about this site
            </div>
            <p className="text-[var(--fg-muted)] leading-relaxed">
              Built with Next.js 15, React Three Fiber, Framer Motion, and Tailwind v4.
              Vibed in a few sittings. Source on{' '}
              <a
                href="https://github.com/Aakarsh1504-CS/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                github
              </a>
              .
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-[var(--fg-dim)]">
              navigate
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[var(--fg-muted)]">
              {['about', 'arsenal', 'experience', 'lab', 'vibe', 'projects', 'contact'].map(
                (id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    /{id}
                  </a>
                )
              )}
            </div>
          </div>

          <div className="space-y-2 md:text-right">
            <div className="text-[10px] uppercase tracking-widest text-[var(--fg-dim)]">
              status
            </div>
            <div className="text-[var(--fg-muted)] flex md:justify-end items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-75 animate-ping" />
                <span className="relative rounded-full h-2 w-2 bg-[var(--accent)]" />
              </span>
              shipping · ist {time}
            </div>
            <div className="text-[var(--fg-dim)]">build · {year}.0.4</div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--line)] flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-[var(--fg-dim)]">
          <div>
            © {year} aakarsh arora · built with intent + caffeine
          </div>
          <div className="flex items-center gap-3">
            <span>no cookies · no tracking · just code</span>
          </div>
        </div>

        {/* ASCII signoff */}
        <pre className="mt-6 text-[var(--fg-dim)] text-[10px] leading-none select-none overflow-hidden whitespace-pre">
{`// EOF — thanks for scrolling.`}
        </pre>
      </div>
    </footer>
  );
};

export default Footer;
