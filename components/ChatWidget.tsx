import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { PERSONAL_INFO, RESEARCH_EXPERIENCE, PROJECTS, SKILLS, EDUCATION_HISTORY, AWARDS, WORK_EXPERIENCE, POSITIONS, PRINCIPLES, STATS } from '../constants';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ease } from '../lib/motion';
import { useScrollAutoHide } from '../lib/useScrollAutoHide';
// KaTeX styles ship with this lazy chunk instead of blocking the first paint.
import 'katex/dist/katex.min.css';

const PANEL_ID = 'roshan-ai-chat';

/* Panel motion: grows from the bottom-right corner (menu-panel language). */
const chatPanel: Variants = {
  closed: {
    scale: 0.6,
    opacity: 0,
    transition: { scale: { duration: 0.3, ease: ease.inQuad }, opacity: { duration: 0.2, delay: 0.1 } },
  },
  open: {
    scale: 1,
    opacity: 1,
    transition: { scale: { duration: 0.5, ease: ease.outCubic }, opacity: { duration: 0.2 } },
  },
};

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
        id: 'intro',
        role: 'model',
        text: "Hi! I can answer questions about Roshan's work: AI data delivery at Mercor, his startup, leadership and background. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  // Launcher steps aside while the reader scrolls down (styling only).
  const dockHidden = useScrollAutoHide(isOpen);

  // Accessibility: focus the input on open, Esc closes, focus returns to the launcher.
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      const id = window.requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsOpen(false);
        }
      };
      document.addEventListener('keydown', onKey);
      return () => {
        window.cancelAnimationFrame(id);
        document.removeEventListener('keydown', onKey);
      };
    }
    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;
    const active = document.activeElement;
    if (!active || active === document.body || panelRef.current?.contains(active)) {
      launcherRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  // Construct the System Instruction
  const systemContext = `
    You answer questions about Muhammed Roshan M for recruiters and hiring managers.
    He is looking for Strategic Projects, AI data operations and evaluation program roles, and is happy to work anywhere in the world the future of AI is being built.
    He is NOT looking for PhD positions. If asked, say he has moved from research into operations and delivery work.

    Answer ONLY from the data below. Do not invent numbers, clients, dates or project names.
    Some of his Mercor work is under NDA. Never guess or name internal projects, customers or task details. If asked, say the specifics are confidential and describe the kind of work instead.

    PERSONAL: ${JSON.stringify(PERSONAL_INFO)}
    HEADLINE NUMBERS: ${JSON.stringify(STATS)}
    EXPERIENCE: ${JSON.stringify(WORK_EXPERIENCE)}
    HOW HE WORKS: ${JSON.stringify(PRINCIPLES)}
    LEADERSHIP: ${JSON.stringify(POSITIONS)}
    SKILLS: ${JSON.stringify(SKILLS)}
    EDUCATION: ${JSON.stringify(EDUCATION_HISTORY)}
    PROJECTS: ${JSON.stringify(PROJECTS)}
    RESEARCH BACKGROUND: ${JSON.stringify(RESEARCH_EXPERIENCE)}
    RECOGNITION: ${JSON.stringify(AWARDS)}

    HOW TO ANSWER:
    1. Plain, direct, professional English. Short answers first, detail only when asked. No hype words.
    2. If asked why he fits an operations or Strategic Projects role, point to: owning evaluation tasks end to end at Mercor on deadlines, 25 contracts and two Top Performer ratings, co-founding Nayrix and launching CompEdge, leading a 200+ person team with an INR 5 lakh budget at Singularity, and his analytical training in physics.
    3. If asked something not in the data, say you only have his professional profile and suggest emailing him at ${PERSONAL_INFO.email}.
    4. Use short lists when they help. No em dashes.
  `;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemContext,
            temperature: 0.7,
        }
      });

      // In a stateless widget, we send the prompt directly. 
      // The system instruction provides the grounding.
      const response = await chat.sendMessage({ message: input });
      
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "I apologize, I couldn't generate a text response."
      };
      
      setMessages(prev => [...prev, modelMsg]);

    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          role: 'model', 
          text: "I encountered a communication error. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="chat-dock fixed bottom-4 right-4 z-[100] font-sans md:bottom-6 md:right-6" data-hidden={dockHidden ? 'true' : undefined}>
      {/* Toggle Button */}
      <button
        ref={launcherRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-controls={isOpen ? PANEL_ID : undefined}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        className={`chat-launcher w-12 h-12 md:w-14 md:h-14 rounded-full grid place-items-center text-paper ${
            isOpen ? 'rotate-90 bg-navy-hover' : 'bg-navy hover:scale-105'
        }`}
      >
        {isOpen ? <X className="text-paper" size={22} strokeWidth={1.75} /> : <MessageCircle className="text-paper" size={22} strokeWidth={1.75} />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
      {isOpen && (
      <motion.div
        variants={chatPanel}
        initial="closed"
        animate="open"
        exit="closed"
        ref={panelRef}
        id={PANEL_ID}
        role="dialog"
        aria-modal="false"
        aria-label="Roshan AI chat"
        style={{ transformOrigin: '100% 100%' }}
        data-lenis-prevent
        className="chat-panel absolute bottom-[4rem] md:bottom-[4.5rem] right-0 w-[min(400px,calc(100vw-2rem))] h-[min(540px,calc(100dvh-6.5rem))] bg-surface border border-line rounded-[1.5rem] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="chat-head on-navy px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-paper/10 rounded-full flex items-center justify-center border border-paper/25">
                <Bot size={18} className="text-paper" strokeWidth={1.75} />
            </div>
            <div>
                <h3 className="text-paper font-semibold text-sm tracking-[0.04em] leading-tight">ROSHAN AI</h3>
                <p className="text-[var(--on-navy-85)] text-[11px] font-medium uppercase tracking-[0.12em] mt-0.5">Powered by Gemini 2.5</p>
            </div>
        </div>

        {/* Messages */}
        <div className="chat-scroll flex-1 overflow-y-auto overscroll-contain px-4 py-5 space-y-3 bg-surface">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed overflow-hidden ${
                        msg.role === 'user' 
                        ? 'chat-bubble-user bg-navy text-paper rounded-br-md' 
                        : 'chat-bubble-bot bg-chip text-ink rounded-bl-md'
                    }`}>
                        <ReactMarkdown 
                            remarkPlugins={[remarkMath, remarkGfm]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                                // Custom styles for Markdown elements (light theme)
                                p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                a: ({node, ...props}) => <a className="chat-link font-medium text-navy underline decoration-1 underline-offset-2 hover:decoration-2" target="_blank" rel="noopener noreferrer" {...props} />,
                                code: ({node, className, ...props}: any) => {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !match ? (
                                        <code className="chat-code bg-surface border border-line px-1.5 py-0.5 rounded-md text-[0.8em] text-navy" {...props} />
                                    ) : (
                                        <code className={className} {...props} />
                                    )
                                },
                                strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                                em: ({node, ...props}) => <em className="opacity-90" {...props} />,
                                blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-navy/30 pl-4 py-1 my-2 text-muted italic" {...props} />,
                            }}
                        >
                            {msg.text}
                        </ReactMarkdown>
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                     <div className="bg-chip px-3.5 py-3 rounded-2xl rounded-bl-md flex gap-1">
                        <div className="w-1.5 h-1.5 bg-navy rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-navy rounded-full animate-bounce [animation-delay:0.1s]"></div>
                        <div className="w-1.5 h-1.5 bg-navy rounded-full animate-bounce [animation-delay:0.2s]"></div>
                     </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-surface border-t border-line flex gap-2">
            <input 
                ref={inputRef}
                type="text"
                aria-label="Ask about his experience"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about his experience..."
                className="chat-input flex-1 min-w-0 bg-surface border border-line rounded-xl px-3.5 py-2.5 text-base md:text-sm text-ink transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy placeholder:text-subtle"
            />
            <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="bg-navy text-paper w-11 shrink-0 grid place-items-center rounded-xl hover:bg-navy-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <Send size={18} strokeWidth={1.75} />
            </button>
        </div>
      </motion.div>
      )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
};

export default ChatWidget;