'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import SectionHeader from './SectionHeader';
import { FaArrowRight } from 'react-icons/fa';

type Errors = { name: string; email: string; message: string };

const Contact = () => {
  const [data, setData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Errors = { name: '', email: '', message: '' };
    let ok = true;
    if (!data.name.trim()) {
      e.name = 'name required';
      ok = false;
    }
    if (!data.email.trim()) {
      e.email = 'email required';
      ok = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      e.email = 'invalid email';
      ok = false;
    }
    if (!data.message.trim()) {
      e.message = 'message required';
      ok = false;
    }
    setErrors(e);
    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await axios.post('/api/contact', data);
      if (res.status === 200) {
        toast.success('message sent. talk soon.', {
          duration: 5000,
          style: {
            background: '#0a0a0a',
            color: '#00ff9c',
            border: '1px solid rgba(0,255,156,0.4)',
            borderRadius: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          },
        });
        setData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error(err);
      toast.error('send failed. try again.', {
        duration: 5000,
        style: {
          background: '#0a0a0a',
          color: '#ff4d6d',
          border: '1px solid rgba(255,77,109,0.4)',
          borderRadius: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((p) => ({ ...p, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          num="07"
          kicker="./connect --open"
          title="Let's build something."
          subtitle="Payments, agents, weird LLM ideas, or just to say hi — the inbox is open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-6 font-mono text-sm"
          >
            <div className="border border-[var(--line)] p-5">
              <div className="text-[10px] uppercase tracking-widest text-[var(--fg-dim)] mb-2">
                direct
              </div>
              <a
                href="mailto:aroraaakarsh0@gmail.com"
                className="text-[var(--fg)] hover:text-[var(--accent)] break-all"
              >
                aroraaakarsh0@gmail.com
              </a>
            </div>

            <div className="border border-[var(--line)] p-5 space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-[var(--fg-dim)] mb-2">
                elsewhere
              </div>
              {[
                { l: 'github', v: 'Aakarsh1504-CS', h: 'https://github.com/Aakarsh1504-CS' },
                {
                  l: 'linkedin',
                  v: 'aakarsh-arora',
                  h: 'https://www.linkedin.com/in/aakarsh-arora-b3965822b/',
                },
                { l: 'leetcode', v: 'Aakarsh_1504', h: 'https://leetcode.com/u/Aakarsh_1504/' },
              ].map((row) => (
                <a
                  key={row.l}
                  href={row.h}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors group"
                >
                  <span>{row.l}</span>
                  <span className="text-[var(--fg)] group-hover:text-[var(--accent)]">
                    {row.v} <FaArrowRight className="inline ml-1 text-[10px]" />
                  </span>
                </a>
              ))}
            </div>

            <div className="text-[10px] uppercase tracking-widest text-[var(--fg-dim)] leading-relaxed">
              avg. response · &lt; 24h · ist business hours
            </div>
          </motion.div>

          {/* Terminal form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 border border-[var(--line-strong)] bg-black/50 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--line)] bg-[var(--bg-soft)]/60 font-mono text-[10px] uppercase tracking-widest">
              <span className="text-[var(--fg-muted)]">message.compose</span>
              <span className="text-[var(--fg-dim)]">untitled · *modified</span>
            </div>

            <div className="p-6 md:p-8 space-y-5 font-mono">
              <Field label="name" name="name" value={data.name} onChange={onChange} error={errors.name} disabled={submitting} />
              <Field label="email" name="email" type="email" value={data.email} onChange={onChange} error={errors.email} disabled={submitting} />

              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-[var(--fg-dim)] mb-2">
                  <span className="text-[var(--accent)]">$</span> message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={data.message}
                  onChange={onChange}
                  disabled={submitting}
                  rows={6}
                  placeholder="// type something interesting..."
                  className={`w-full bg-transparent border ${
                    errors.message ? 'border-[var(--danger)]' : 'border-[var(--line)]'
                  } focus:border-[var(--accent)] outline-none px-3 py-2 text-[var(--fg)] placeholder-[var(--fg-dim)] resize-none font-mono text-sm disabled:opacity-50 transition-colors`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-[var(--danger)]">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-[var(--accent)] text-black font-mono text-sm uppercase tracking-wider px-5 py-3 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="blink">▌</span> sending…
                  </>
                ) : (
                  <>
                    transmit <FaArrowRight />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

const Field = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
}) => (
  <div>
    <label htmlFor={name} className="block text-[10px] uppercase tracking-widest text-[var(--fg-dim)] mb-2">
      <span className="text-[var(--accent)]">$</span> {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoComplete="off"
      placeholder={`// your ${label}`}
      className={`w-full bg-transparent border ${
        error ? 'border-[var(--danger)]' : 'border-[var(--line)]'
      } focus:border-[var(--accent)] outline-none px-3 py-2 text-[var(--fg)] placeholder-[var(--fg-dim)] font-mono text-sm disabled:opacity-50 transition-colors`}
    />
    {error && <p className="mt-1 text-xs text-[var(--danger)]">{error}</p>}
  </div>
);

export default Contact;
