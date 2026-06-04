import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { GripVertical, PlusCircle } from 'lucide-react';

export default function CustomWorksheet() {
  const qTypes = ['Multiple Choice (MCQ)', 'True / False', 'Fill in the Blanks', 'Short Answer', 'Long Essay'];

  return (
    <div className="h-full flex gap-6 p-1">
      {/* Left Column - Draggable Pills */}
      <GlassCard className="w-1/3 flex flex-col gap-4">
        <h3 className="font-semibold text-white mb-2 text-sm">Question Types</h3>
        <div className="space-y-3">
          {qTypes.map((type, i) => (
            <div 
              key={i}
              draggable
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 cursor-grab hover:bg-neon-purple/20 hover:border-neon-purple/50 transition-all text-sm text-gray-200"
            >
              <GripVertical size={16} className="text-gray-500" />
              {type}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Right Column - Drop Zone Canvas */}
      <div className="flex-[2] glass-panel rounded-xl border-2 border-dashed border-white/20 p-8 flex flex-col items-center justify-center relative hover:border-neon-purple/50 transition-colors group">
        <div className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-400 group-hover:text-neon-purple group-hover:bg-neon-purple/20 transition-colors">
            <PlusCircle size={32} />
          </div>
          <h3 className="text-lg font-medium text-white">Drag & Drop to Build</h3>
          <p className="text-sm text-gray-400 max-w-xs mx-auto">
            Drag question types from the left panel and drop them here to compose your custom worksheet.
          </p>
        </div>
      </div>
    </div>
  );
}
