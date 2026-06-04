import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import { Presentation, Download, LayoutTemplate } from 'lucide-react';

export default function AIPPTGen() {
  const slides = [
    { title: 'Introduction to AI', bullets: ['What is AI?', 'History of AI', 'Types of AI'] },
    { title: 'Neural Networks', bullets: ['Biological vs Artificial', 'Perceptrons', 'Hidden Layers'] },
    { title: 'Deep Learning', bullets: ['Multiple Layers', 'Feature Extraction', 'Applications'] },
    { title: 'The Future', bullets: ['AGI', 'Ethical concerns', 'Job market impact'] },
  ];

  return (
    <div className="h-full flex flex-col gap-6 p-1">
      {/* Config Card */}
      <GlassCard className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Presentation className="text-neon-purple" size={24} />
          <div>
            <h3 className="font-semibold text-white">Presentation Generator</h3>
            <p className="text-xs text-gray-400">Generate PPTs directly from the book content</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-48">
            <Dropdown options={['Modern Dark', 'Clean White', 'Neon Cyber']} placeholder="Visual Theme" value="Modern Dark" onChange={()=>{}} />
          </div>
          <Button variant="accent" className="flex items-center gap-2">
            <Download size={16} /> Export .PPTX
          </Button>
        </div>
      </GlassCard>

      {/* Grid Canvas */}
      <div className="flex-1 grid grid-cols-2 gap-6 overflow-y-auto custom-scrollbar">
        {slides.map((slide, i) => (
          <div key={i} className="glass-panel aspect-video rounded-xl p-6 flex flex-col border border-white/10 hover:border-neon-purple/50 transition-colors relative group">
            <div className="absolute top-4 right-4 text-gray-500 opacity-50 group-hover:opacity-100 transition-opacity">
              <LayoutTemplate size={20} />
            </div>
            <span className="text-xs text-neon-purple font-medium mb-4">Slide {i + 1}</span>
            <h2 className="text-2xl font-bold text-white mb-4">{slide.title}</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
              {slide.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
