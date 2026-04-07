import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, User, Bot, Loader2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { MOCK_PRODUCTS } from '../data/mockData';
import { cn } from '../lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'assistant';
  content: string;
  products?: typeof MOCK_PRODUCTS;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your LuxeMarket personal shopper. Looking for something specific today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: 'user',
            parts: [{ text: `You are a luxury fashion assistant for LuxeMarket. 
            Available products: ${JSON.stringify(MOCK_PRODUCTS.map(p => ({ id: p.id, name: p.name, price: p.price, category: p.category })))}
            User asked: "${userMessage}"
            Recommend relevant products if any. Return a helpful response and list product IDs if you recommend any.` }]
          }
        ],
        config: {
          systemInstruction: "You are a helpful, sophisticated personal shopper for a high-end fashion store. Be concise and elegant."
        }
      });

      const aiContent = response.text || "I'm sorry, I couldn't process that. How else can I help?";
      
      // Simple logic to find product IDs in the response
      const recommendedIds = MOCK_PRODUCTS
        .filter(p => aiContent.toLowerCase().includes(p.name.toLowerCase()) || aiContent.includes(p.id))
        .map(p => p);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiContent,
        products: recommendedIds.length > 0 ? recommendedIds : undefined
      }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having a bit of trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-luxury-black text-white p-4 rounded-full shadow-2xl hover:bg-luxury-gold transition-all duration-300 group"
      >
        <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-50 w-[380px] h-[500px] bg-luxury-paper border border-luxury-black/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-luxury-black p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="bg-luxury-gold p-1.5 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-serif tracking-tight">AI Personal Shopper</h3>
                  <span className="text-[10px] text-white/60 uppercase tracking-widest">Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-luxury-gold transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-luxury-cream/30">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-luxury-black text-white rounded-tr-none" 
                      : "bg-white text-luxury-black border border-luxury-black/5 rounded-tl-none shadow-sm"
                  )}>
                    {msg.content}
                  </div>
                  
                  {msg.products && (
                    <div className="mt-3 grid grid-cols-1 gap-2 w-full">
                      {msg.products.map(product => (
                        <div key={product.id} className="bg-white p-2 rounded-xl border border-luxury-black/5 flex items-center gap-3 shadow-sm">
                          <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold truncate">{product.name}</h4>
                            <span className="text-xs text-luxury-gold">${product.price}</span>
                          </div>
                          <button className="p-2 hover:bg-luxury-cream rounded-full transition-colors">
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-luxury-black/40">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs italic">Finding the perfect style...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-luxury-black/5 bg-white">
              <div className="flex items-center gap-2 bg-luxury-cream/50 rounded-xl px-4 py-2 border border-luxury-black/5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm placeholder:text-luxury-black/30"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="text-luxury-black hover:text-luxury-gold transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
