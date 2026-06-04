import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Slider from '@/components/ui/Slider';
import Button from '@/components/ui/Button';
import { Download, FileText, Settings2 } from 'lucide-react';

export default function WorksheetGen() {
  const [difficulty, setDifficulty] = useState(50);
  const [qCount, setQCount] = useState(10);
  const [content, setContent] = useState('');
  const fullText = "Name: ____________________   Date: ________\n\nTopic: Neural Networks\n\nQ1. What is the primary function of a neuron in an artificial neural network?\n___________________________________________________________________\n___________________________________________________________________\n\nQ2. Explain the concept of 'weights' and 'biases' with an example.\n___________________________________________________________________\n___________________________________________________________________\n\nQ3. How does a neural network 'learn' from data?\n___________________________________________________________________\n___________________________________________________________________";

  useEffect(() => {
    let i = 0;
    setContent('');
    const interval = setInterval(() => {
      setContent(prev => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col gap-6 p-1">
      {/* Config Card */}
      <GlassCard className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Settings2 className="text-neon-purple" />
            Worksheet Configuration
          </h3>
          <Button variant="accent" className="flex items-center gap-2">
            <Download size={16} /> Export PDF
          </Button>
        </div>
        <div className="flex gap-8">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Difficulty</span>
              <span>{difficulty}%</span>
            </div>
            <Slider value={difficulty} onChange={setDifficulty} />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Question Count</span>
              <span>{qCount}</span>
            </div>
            <Slider value={qCount} max={50} onChange={setQCount} />
          </div>
        </div>
      </GlassCard>

      {/* A4 Preview Canvas */}
      <div className="flex-1 glass-panel rounded-xl flex justify-center p-8 overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-[600px] min-h-[800px] bg-white text-black p-10 shadow-2xl rounded-sm font-sans relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FileText size={100} />
          </div>
          <h2 className="text-center font-bold text-2xl mb-8">Worksheet: Artificial Intelligence</h2>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-loose">
            {content}
            <span className="inline-block w-2 h-4 bg-black animate-pulse ml-1 align-middle"></span>
          </pre>
        </div>
      </div>
    </div>
  );
}
