import React, { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Section, PieChart } from 'lucide-react';

export default function TestPaperGen() {
  const [sections, setSections] = useState([{ name: 'Section A: Objective', marks: 20 }]);

  return (
    <div className="h-full flex gap-6 p-1">
      {/* Left Side - Sections */}
      <GlassCard className="w-1/2 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Section className="text-neon-purple" />
            Paper Sections
          </h3>
          <Button variant="ghost" className="text-xs" onClick={() => setSections([...sections, { name: 'New Section', marks: 10 }])}>
            <Plus size={14} /> Add Section
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4">
          {sections.map((sec, i) => (
            <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col gap-3">
              <Input defaultValue={sec.name} className="text-sm font-medium" />
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Marks Weightage:</span>
                <Input defaultValue={sec.marks} type="number" className="w-20 py-1 text-center" />
              </div>
            </div>
          ))}
        </div>
        <Button variant="primary" className="w-full">Generate Paper</Button>
      </GlassCard>

      {/* Right Side - Difficulty Chart */}
      <GlassCard className="w-1/2 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <PieChart className="text-emerald-green" />
          <h3 className="font-semibold text-white">Difficulty Split</h3>
        </div>

        {/* Pure CSS Glowing Donut Chart */}
        <div className="relative w-64 h-64 mt-8">
          <div 
            className="w-full h-full rounded-full box-shadow-glow-purple"
            style={{
              background: `conic-gradient(
                #8b5cf6 0% 50%,     /* Medium - Purple */
                #10b981 50% 80%,    /* Easy - Green */
                #ef4444 80% 100%    /* Hard - Red */
              )`
            }}
          ></div>
          {/* Inner cutout for donut */}
          <div className="absolute inset-0 m-auto w-48 h-48 bg-obsidian rounded-full flex items-center justify-center shadow-inner">
            <div className="text-center">
              <span className="text-3xl font-bold text-white">100</span>
              <p className="text-xs text-gray-400">Total Marks</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-green box-shadow-glow-green"></div>
            <span className="text-sm text-gray-300">Easy (30%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neon-purple box-shadow-glow-purple"></div>
            <span className="text-sm text-gray-300">Medium (50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <span className="text-sm text-gray-300">Hard (20%)</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
