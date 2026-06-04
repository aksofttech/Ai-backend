import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import { Clock, Book, BrainCircuit } from 'lucide-react';

export default function AILessonPlan() {
  const blocks = [
    { time: '0-10 min', title: 'Introduction & Hook', desc: 'Real-world example of AI (e.g., self-driving cars).' },
    { time: '10-25 min', title: 'Core Concept Explanation', desc: 'Deep dive into Neural Networks structure.' },
    { time: '25-40 min', title: 'Interactive Activity', desc: 'Group discussion on ethical AI implications.' },
    { time: '40-45 min', title: 'Summary & Q&A', desc: 'Wrap up and clear doubts.' },
  ];

  return (
    <div className="h-full flex flex-col gap-6 p-1">
      {/* Config Card */}
      <GlassCard className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <BrainCircuit className="text-neon-purple" />
            AI Lesson Plan Generator
          </h3>
          <Button variant="accent" className="text-sm px-4 py-1">Generate</Button>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-gray-400 mb-1 block">Duration (mins)</label>
            <Input type="number" defaultValue={45} className="bg-black/20" />
          </div>
          <div className="flex-[2]">
            <label className="text-xs text-gray-400 mb-1 block">Learning Objective</label>
            <Input defaultValue="Understand basics of Neural Networks" className="bg-black/20" />
          </div>
        </div>
      </GlassCard>

      {/* Timeline Canvas */}
      <GlassCard className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 relative">
        <div className="absolute left-[39px] top-8 bottom-8 w-0.5 bg-white/10 rounded-full"></div>
        {blocks.map((block, i) => (
          <div key={i} className="flex gap-6 relative z-10">
            <div className="w-16 flex-shrink-0 flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-emerald-green box-shadow-glow-green mb-1 z-10"></div>
              <span className="text-[10px] text-emerald-green font-mono">{block.time}</span>
            </div>
            <div className="flex-1 glass-panel p-4 rounded-xl border border-white/5 hover:border-emerald-green/30 transition-colors">
              <h4 className="text-white font-medium mb-1">{block.title}</h4>
              <p className="text-sm text-gray-400">{block.desc}</p>
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}
