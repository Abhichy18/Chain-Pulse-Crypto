import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MessageSquare, X, Send, TerminalSquare } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'ChainPulse Terminal active. How can I assist your telemetry today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatWindowRef = useRef(null);
  const messagesEndRef = useRef(null);

  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

  // scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => scrollToBottom(), [messages, isTyping]);

  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      gsap.fromTo(chatWindowRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.2)' }
      );
    }
  }, [isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    // Add user message
    const userMsg = inputMessage.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputMessage('');
    setIsTyping(true);

    try {
      if (!OPENROUTER_API_KEY) {
        throw new Error('Missing API Key');
      }
      
      // Format previous messages for OpenRouter (OpenAI schema format)
      const history = messages
        .filter(m => !m.text.includes('ChainPulse Terminal active')) // exclude initial greeting
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }));

      // Prepend the system prompt and append the new user query
      history.unshift({
        role: "system",
        content: "You are the ChainPulse Oracle, an elite AI assistant for a dark crypto terminal. Keep your answers brief, edgy, and technical."
      });
      history.push({ role: "user", content: userMsg });

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://chainpulse.vercel.app", // production referer avoids localhost blocks on free tier
          "X-Title": "ChainPulse Terminal",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/auto", // OpenRouter dynamic router prevents 404 blockages natively
          messages: history,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.choices?.[0]?.message?.content || "Query processed.";
      
      setMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
      
    } catch (error) {
      console.error("OpenRouter API Request Failed:", error);
      const errorMessage = error.message.includes('API key not valid') || error.message.includes('Missing API')
        ? "API Key rejected by provider." 
        : error.message || "Cryptographic handshake failed.";
        
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `[ERROR] ${errorMessage}. Ensure VITE_OPENROUTER_API_KEY is correctly set and refresh your browser.` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[6000] flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatWindowRef} 
          className="mb-4 w-80 md:w-96 bg-[#0A0D08] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto"
        >
          {/* Header */}
          <div className="bg-void border-b border-white/5 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TerminalSquare size={16} className="text-acid" />
              <span className="font-mono text-xs text-white uppercase tracking-widest">Oracle System</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-offwhite/50 hover:text-white transition-colors cursor-none magnetic">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 h-80 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm font-sans ${
                  msg.sender === 'user' 
                    ? 'bg-white/10 text-white rounded-br-none' 
                    : 'bg-gradient-to-br from-[#12180E] to-[#0A0D08] border border-white/5 text-offwhite/80 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#12180E] border border-white/5 p-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1.5 items-center h-4">
                    <div className="w-1.5 h-1.5 bg-acid rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-acid rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-acid rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-void border-t border-white/5 flex items-center space-x-2">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask the oracle..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-white font-sans placeholder-offwhite/30 px-2 cursor-text"
              disabled={isTyping}
            />
            <button 
              type="submit"
              disabled={isTyping || !inputMessage.trim()}
              className="p-2 rounded-md bg-electric/10 text-electric hover:bg-electric hover:text-void disabled:opacity-50 disabled:hover:bg-electric/10 disabled:hover:text-electric transition-colors cursor-none magnetic"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-electric text-void rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:scale-105 transition-transform cursor-none magnetic pointer-events-auto"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

    </div>
  );
}
