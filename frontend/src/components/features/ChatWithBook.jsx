import React, { useState, useRef, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Send, Sparkles, BookOpen } from 'lucide-react';

export default function ChatWithBook() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your AI Teaching Assistant. How can I help you explain Neural Networks to your 10th grade class?', citation: 'Page 42' }
  ]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: 'Neural networks are designed to mimic the human brain. You can use an analogy of a team of students passing a message where each student (neuron) processes the information before passing it on.', citation: 'Page 43' }]);
    }, 1000);
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <GlassCard className="h-full flex flex-col relative p-0 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-glass-border bg-obsidian/50 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="text-neon-purple" size={20} />
          <h3 className="font-semibold text-white">Chat with Textbook</h3>
        </div>
        <Sparkles className="text-emerald-green" size={18} />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'self-end items-end ml-auto' : 'self-start items-start mr-auto'}`}>
            <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-neon-purple text-white rounded-br-sm box-shadow-glow-purple' : 'bg-white/10 text-gray-200 rounded-bl-sm border border-white/5'}`}>
              <p className="text-sm">{msg.content}</p>
            </div>
            {msg.citation && (
              <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <BookOpen size={10} /> Source: {msg.citation}
              </span>
            )}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-glass-border bg-obsidian/80 backdrop-blur-lg">
        <div className="flex gap-2 relative">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about the textbook..." 
            className="pr-12 rounded-full"
          />
          <Button variant="primary" onClick={handleSend} className="absolute right-1 top-1 bottom-1 rounded-full px-3 py-1 !h-auto">
            <Send size={16} />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
