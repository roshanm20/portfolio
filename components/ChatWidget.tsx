import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { PERSONAL_INFO, RESEARCH_EXPERIENCE, PROJECTS, SKILLS, EDUCATION_HISTORY, AWARDS, WORK_EXPERIENCE, POSITIONS, PRINCIPLES, STATS } from '../constants';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

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

  // Construct the System Instruction
  const systemContext = `
    You answer questions about Muhammed Roshan M for recruiters and hiring managers.
    He is looking for Strategic Projects, AI data operations and evaluation program roles, and is ready to relocate, including to New York.
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
    <div className="fixed bottom-6 right-6 z-[90] font-sans">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(215,25,33,0.3)] transition-all duration-300 ${
            isOpen ? 'bg-nothing-gray rotate-90' : 'bg-nothing-red hover:scale-110'
        }`}
      >
        {isOpen ? <X className="text-white" /> : <MessageCircle className="text-white" />}
      </button>

      {/* Chat Window */}
      <div className={`absolute bottom-20 right-0 w-[90vw] md:w-[400px] bg-nothing-black border border-nothing-gray rounded-lg shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col ${
          isOpen ? 'opacity-100 scale-100 h-[500px]' : 'opacity-0 scale-90 h-0 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="bg-nothing-dark border-b border-nothing-gray p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-nothing-red/20 rounded-full flex items-center justify-center border border-nothing-red">
                <Bot size={18} className="text-nothing-red" />
            </div>
            <div>
                <h3 className="text-nothing-white font-bold font-mono text-sm">ROSHAN AI</h3>
                <p className="text-nothing-gray text-[10px] uppercase tracking-wider">Powered by Gemini 2.5</p>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-nothing-black/50 scrollbar-thin">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-3 rounded-lg text-sm leading-relaxed overflow-hidden ${
                        msg.role === 'user' 
                        ? 'bg-nothing-white text-nothing-black font-medium' 
                        : 'bg-nothing-dark border border-nothing-gray text-nothing-light font-mono'
                    }`}>
                        <ReactMarkdown 
                            remarkPlugins={[remarkMath, remarkGfm]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                                // Custom styles for Markdown elements to match Nothing OS
                                p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                a: ({node, ...props}) => <a className="text-nothing-red hover:underline decoration-1 underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />,
                                code: ({node, className, ...props}: any) => {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !match ? (
                                        <code className="bg-nothing-black border border-nothing-gray px-1.5 py-0.5 rounded text-xs font-mono text-nothing-red" {...props} />
                                    ) : (
                                        <code className={className} {...props} />
                                    )
                                },
                                strong: ({node, ...props}) => <strong className="text-nothing-white font-bold" {...props} />,
                                em: ({node, ...props}) => <em className="text-nothing-light/80" {...props} />,
                                blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-nothing-red pl-4 py-1 my-2 text-nothing-gray italic" {...props} />,
                            }}
                        >
                            {msg.text}
                        </ReactMarkdown>
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                     <div className="bg-nothing-dark border border-nothing-gray p-3 rounded-lg flex gap-1">
                        <div className="w-1.5 h-1.5 bg-nothing-red rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-nothing-red rounded-full animate-bounce [animation-delay:0.1s]"></div>
                        <div className="w-1.5 h-1.5 bg-nothing-red rounded-full animate-bounce [animation-delay:0.2s]"></div>
                     </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-nothing-dark border-t border-nothing-gray flex gap-2">
            <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about his experience..."
                className="flex-1 bg-nothing-black border border-nothing-gray rounded px-3 py-2 text-sm text-nothing-white focus:outline-none focus:border-nothing-red font-mono placeholder:text-nothing-gray"
            />
            <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-nothing-red text-white p-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Send size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;