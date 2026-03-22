import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import axios from 'axios';
import { profile } from '../data';
import ScrollReveal from './ScrollReveal';
import emailjs from "@emailjs/browser";

const INITIAL = { name: '', email: '', message: '' };

const INPUT_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.75rem',
  color: 'var(--color-text)',
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
  transition: 'all 0.2s ease',
  backdropFilter: 'blur(8px)',
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('loading');
  setErrorMsg('');

  try {

    // 1️⃣ Send email using EmailJS
    await emailjs.send(
      "service_v1u5eof",
      "template_ujfwxn8",
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      "t9zv-2-Fq9X0YBBYy"
    );

    // 2️⃣ Save message to database (optional)
    await axios.post(
      "https://portfolio-website-rs7d.onrender.com/api/contact",
      form
    );

    setStatus('success');
    setForm(INITIAL);

  } catch (err) {
    setStatus('error');
    setErrorMsg(err.message || "Failed to send message.");
  }
};

  return (
    <section id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="section-container" ref={ref}>
        <ScrollReveal direction="up">
          <div className="mb-14">
            <span className="accent-line block" />
            <h2 className="display-heading text-4xl md:text-5xl font-bold">
              Get in{' '}
              <span className="italic" style={{ color: 'var(--color-muted)' }}>touch.</span>
            </h2>
            <p className="text-base mt-4 max-w-lg" style={{ color: 'var(--color-muted)' }}>
              Have a project in mind or just want to say hi? Fill in the form and I'll get back to you soon.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* ── Form ─────────────────────────────────────────────── */}
          <ScrollReveal direction="left" delay={0.1}>
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                className="card flex flex-col items-center text-center gap-4 py-14"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(124,110,247,0.2), rgba(86,207,225,0.2))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(124,110,247,0.4)',
                  }}
                >
                  <CheckCircle size={28} style={{ color: 'var(--color-accent2)' }} />
                </motion.div>
                <h3 className="display-heading text-xl font-semibold">Message sent!</h3>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  Thanks for reaching out. I'll reply within 24 hours. ✨
                </p>
                <button onClick={() => setStatus(null)} className="btn-outline mt-2 text-sm py-2">
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)' }}>
                    Name
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    placeholder="Your full name"
                    style={INPUT_STYLE}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(124,110,247,0.6)'; e.target.style.boxShadow = '0 0 16px rgba(124,110,247,0.15)'; }}
                    onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)' }}>
                    Email
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    style={INPUT_STYLE}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(124,110,247,0.6)'; e.target.style.boxShadow = '0 0 16px rgba(124,110,247,0.15)'; }}
                    onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)' }}>
                    Message
                  </label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project…"
                    style={{ ...INPUT_STYLE, resize: 'none' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(124,110,247,0.6)'; e.target.style.boxShadow = '0 0 16px rgba(124,110,247,0.15)'; }}
                    onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div className="flex items-start gap-3 p-3 rounded-xl text-sm"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
                    <AlertCircle size={15} className="mt-0.5 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/>
                        <path fill="white" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <><Send size={15}/> Send Message</>
                  )}
                </motion.button>
              </form>
            )}
          </ScrollReveal>

          {/* ── Contact info ──────────────────────────────────────── */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-4">
              <motion.div whileHover={{ borderColor: 'var(--color-border2)' }} className="card">
                <h3 className="display-heading text-lg font-semibold mb-4">Connect with me</h3>
                <div className="space-y-3">
                  {[
                    { icon: <Mail size={15}/>, label: profile.email, href: `mailto:${profile.email}` },
                    { icon: <Github size={15}/>, label: 'github.com/sriwastav07', href: profile.github },
                    { icon: <Linkedin size={15}/>, label: 'linkedin.com/in/anisha172', href: profile.linkedin },
                    { icon: <MapPin size={15}/>, label: 'India', href: null },
                  ].map((item) => (
                    <div key={item.label}>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm transition-colors hover:text-[var(--color-accent)]"
                          style={{ color: 'var(--color-muted)' }}>
                          <span style={{ color: 'var(--color-accent)' }}>{item.icon}</span>
                          {item.label}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-muted)' }}>
                          <span style={{ color: 'var(--color-accent)' }}>{item.icon}</span>
                          {item.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div whileHover={{ borderColor: 'var(--color-border2)' }} className="card">
                <h3 className="display-heading text-base font-semibold mb-2">Response time</h3>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  I typically reply within{' '}
                  <strong style={{ color: 'var(--color-accent2)' }}>24 hours</strong>.
                  For urgent matters, reach me via email.
                </p>
              </motion.div>

              {/* Availability pill */}
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(86,207,225,0.06)', border: '1px solid rgba(86,207,225,0.2)' }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-accent2)' }}/>
                <span className="text-sm font-medium" style={{ color: 'var(--color-accent2)' }}>
                  Available for new opportunities
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
