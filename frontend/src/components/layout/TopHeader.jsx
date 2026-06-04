import React, { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import { Sparkles } from 'lucide-react';

export default function TopHeader() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');

  return (
    <header className="h-[70px] w-full flex items-center justify-between px-6 z-20">
      {/* Pill-shaped frosted glass bar for selections */}
      <div className="glass-panel rounded-full px-6 py-2 flex items-center gap-4 flex-1 max-w-3xl">
        <div className="w-1/3">
          <Dropdown 
            options={['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']} 
            placeholder="Select Class" 
            value={selectedClass} 
            onChange={setSelectedClass}
            className="w-full"
          />
        </div>
        <div className="w-1/3">
          <Dropdown 
            options={['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']} 
            placeholder="Select Subject" 
            value={selectedSubject} 
            onChange={setSelectedSubject}
            className="w-full"
          />
        </div>
        <div className="w-1/3">
          <Dropdown 
            options={['Ch 1: Introduction', 'Ch 2: Core Concepts', 'Ch 3: Advanced Topics']} 
            placeholder="Select Chapter" 
            value={selectedChapter} 
            onChange={setSelectedChapter}
            className="w-full"
          />
        </div>
      </div>

      {/* RAG Engine Status indicator */}
      <div className="ml-4 flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-emerald-green/30">
        <div className="w-2 h-2 rounded-full bg-emerald-green box-shadow-glow-green animate-pulse"></div>
        <Sparkles size={14} className="text-emerald-green" />
        <span className="text-sm font-medium text-emerald-green text-shadow-glow-green">RAG Engine Active</span>
      </div>
    </header>
  );
}
