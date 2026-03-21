import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import axios from 'axios';

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm self-start"
      style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)', backdropFilter: 'blur(16px)', maxWidth: 70 }}>
      {[0, 0.18, 0.36].map((d, i) => (
        <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, delay: d, repeat: Infinity, ease: 'easeInOut' }}
          className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
      ))}
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────
function Bubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22,1,0.36,1] }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isUser ? '' : ''}`}
        style={{
          background: isUser
            ? 'linear-gradient(135deg, var(--color-accent), #9d8ff8)'
            : 'rgba(86,207,225,0.15)',
          border: isUser ? 'none' : '1px solid rgba(86,207,225,0.3)',
        }}>
        {isUser ? <User size={13} color="#fff" /> : <Bot size={13} style={{ color: 'var(--color-accent2)' }} />}
      </div>
      {/* Bubble */}
      <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}>
        {msg.content}
      </div>
    </motion.div>
  );
}

// ── Chatbot ────────────────────────────────────────────────────────────────────
const WELCOME = { role: 'assistant', content: "Hi! I'm Anisha's AI assistant. Ask me anything about her skills, projects, or experience! ✨" };

const SUGGESTIONS = [
  'Tell me about her projects',
  'What skills does she have?',
  'What is her education?',
];

export default function AIChatbot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [hasNew,   setHasNew]   = useState(false);
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 300); setHasNew(false); }
  }, [open]);

  const send = async (text) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      const res = await axios.post('/api/chat', { message: userMsg });
      setMessages((m) => [...m, { role: 'assistant', content: res.data.reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: "Sorry, I couldn't connect right now. Please try again!" }]);
    } finally {
      setLoading(false);
      if (!open) setHasNew(true);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      {/* ── Chat window ─────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ duration: 0.32, ease: [0.22,1,0.36,1] }}
            className="fixed bottom-24 right-5 z-50 flex flex-col"
            style={{
              width: 'min(380px, calc(100vw - 2.5rem))',
              height: 'min(540px, calc(100vh - 8rem))',
              background: 'rgba(8,11,20,0.88)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(124,110,247,0.3)',
              borderRadius: '1.25rem',
              boxShadow: '0 0 60px rgba(124,110,247,0.2), 0 32px 80px -12px rgba(0,0,0,0.7)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(124,110,247,0.07)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent2))' }}>
                  <Sparkles size={15} color="#fff" />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Ask Me About Anisha</p>
                  <p className="text-xs" style={{ color: 'var(--color-accent2)' }}>● Online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ color: 'var(--color-muted)' }}>
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(124,110,247,0.3) transparent' }}>
              {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions (only on first few messages) */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="text-xs px-2.5 py-1 rounded-full transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-muted)', background: 'rgba(255,255,255,0.04)' }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 shrink-0">
              <div className="flex items-end gap-2 rounded-xl px-3 py-2"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(124,110,247,0.25)' }}>
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px'; }}
                  onKeyDown={handleKey}
                  placeholder="Ask something…"
                  className="flex-1 bg-transparent text-sm outline-none resize-none leading-relaxed"
                  style={{ color: 'var(--color-text)', maxHeight: 96, overflowY: 'auto',
                    '::placeholder': { color: 'var(--color-muted)' } }}
                />
                <motion.button
                  onClick={() => send()}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent2))' }}
                >
                  <Send size={13} color="#fff" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating trigger button ──────────────────────────────── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-5 z-50 w-13 h-13 rounded-2xl flex items-center justify-center shadow-2xl"
        style={{
          width: 52, height: 52,
          background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent2))',
          boxShadow: '0 0 32px rgba(124,110,247,0.5), 0 8px 24px rgba(0,0,0,0.4)',
        }}
        aria-label="Open AI chatbot"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x"    initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.2}}><X size={22} color="#fff"/></motion.span>
            : <motion.span key="chat" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.2}}><MessageCircle size={22} color="#fff"/></motion.span>
          }
        </AnimatePresence>

        {/* New message dot */}
        {hasNew && !open && (
          <motion.div initial={{scale:0}} animate={{scale:1}}
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{ background: 'var(--color-gold)', border: '2px solid var(--color-bg)' }} />
        )}
      </motion.button>
    </>
  );
}
