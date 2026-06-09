import React, { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { BrainCircuit } from 'lucide-react';
import BookSelectionForm from '@/components/BookSelectionForm';

export default function AILessonPlan() {
  const [lessonPlan, setLessonPlan] = useState(null);

  if (!lessonPlan) {
    return <BookSelectionForm onGenerate={(data) => setLessonPlan(data)} />;
  }

  const periods = lessonPlan.periods || [];

  return (
    <div className="h-full flex flex-col gap-6 p-1">
      {/* Config Card */}
      <GlassCard className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <BrainCircuit className="text-neon-purple" />
            {lessonPlan.chapterName || "AI Lesson Plan Generated"}
          </h3>
          <Button variant="accent" className="text-sm px-4 py-1" onClick={() => setLessonPlan(null)}>
            Reset / New Plan
          </Button>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-gray-400 mb-1 block">Theme</label>
            <Input defaultValue={lessonPlan.theme || "N/A"} readOnly className="bg-black/20 text-gray-300" />
          </div>
          <div className="flex-[2]">
            <label className="text-xs text-gray-400 mb-1 block">NCF Goals</label>
            <Input defaultValue={lessonPlan.ncfGoals || "N/A"} readOnly className="bg-black/20 text-gray-300" />
          </div>
        </div>

        <div className="mt-2 p-3 rounded-lg bg-black/20 border border-white/5">
          <strong className="text-xs text-emerald-green uppercase tracking-wider block mb-1">Learning Objectives:</strong>
          <ul className="list-disc list-inside text-sm text-gray-300">
            {lessonPlan.learningObjectives?.map((obj, idx) => (
              <li key={idx}>{obj}</li>
            ))}
          </ul>
        </div>
      </GlassCard>

      {/* Timeline Canvas */}
      <GlassCard className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 relative">
        <div className="absolute left-[47px] top-8 bottom-8 w-0.5 bg-white/10 rounded-full"></div>
        {periods.map((period, i) => (
          <div key={i} className="flex gap-6 relative z-10">
            <div className="w-20 flex-shrink-0 flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-emerald-green box-shadow-glow-green mb-1 z-10"></div>
              <span className="text-[11px] text-emerald-green font-mono font-bold mt-1">Day {period.day}</span>
              <span className="text-[10px] text-emerald-green/70 font-mono text-center leading-tight mt-0.5">{period.duration}</span>
            </div>
            
            <div className="flex-1 glass-panel p-5 rounded-xl border border-white/5 hover:border-emerald-green/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg text-white font-semibold">{period.topic}</h4>
                <span className="px-2 py-1 bg-neon-purple/20 text-neon-purple text-[10px] font-bold uppercase rounded-md">
                  {period.skill}
                </span>
              </div>
              
              <div className="space-y-4">
                {period.introduction && (
                  <div>
                    <h5 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Introduction</h5>
                    <p className="text-sm text-gray-300">{period.introduction}</p>
                  </div>
                )}
                {period.exploration && (
                  <div>
                    <h5 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Exploration</h5>
                    <p className="text-sm text-gray-300">{period.exploration}</p>
                  </div>
                )}
                {period.conclusion && (
                  <div>
                    <h5 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Conclusion</h5>
                    <p className="text-sm text-gray-300">{period.conclusion}</p>
                  </div>
                )}
                {period.homework && (
                  <div className="pt-3 border-t border-white/5 mt-3">
                    <h5 className="text-[10px] font-semibold text-emerald-green uppercase tracking-wider mb-1">Homework / Assignment</h5>
                    <p className="text-sm text-gray-300">{period.homework}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {periods.length === 0 && (
          <div className="text-center text-gray-500 py-10">No periods generated in this plan.</div>
        )}
      </GlassCard>
    </div>
  );
}
