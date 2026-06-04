import React from 'react';
import { 
  MessageSquare, BookOpen, FileText, LayoutDashboard, 
  CheckCircle, Presentation, FilePenLine, User 
} from 'lucide-react';

const TOOLS = [
  { id: 'chat', label: 'Chat with Book', icon: MessageSquare },
  { id: 'lesson', label: 'AI Lesson Plan', icon: BookOpen },
  { id: 'worksheet', label: 'Worksheet Gen', icon: FileText },
  { id: 'custom-worksheet', label: 'Custom Worksheet', icon: LayoutDashboard },
  { id: 'answer-key', label: 'Answer Key Gen', icon: CheckCircle },
  { id: 'ppt', label: 'AI PPT Gen', icon: Presentation },
  { id: 'test-paper', label: 'Test Paper Gen', icon: FilePenLine },
  { id: 'homework', label: 'AI Homework Gen', icon: BookOpen },
];

export default function Sidebar({ activeTool, setActiveTool }) {
  return (
    <div className="w-[250px] h-full flex flex-col glass-panel border-l-0 border-y-0 rounded-none z-10">
      {/* Brand Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          <span className="text-neon-purple text-shadow-glow-purple">Yugsoft</span> Tech
        </h1>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4 space-y-2">
        {TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-r-lg transition-all duration-200 text-sm font-medium
                ${isActive 
                  ? 'bg-neon-purple-dim text-white border-l-4 border-neon-purple box-shadow-glow-purple' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border-l-4 border-transparent'
                }
              `}
            >
              <Icon size={18} className={isActive ? "text-neon-purple" : ""} />
              {tool.label}
            </button>
          );
        })}
      </div>

      {/* User Profile Pill */}
      <div className="p-4 border-t border-glass-border">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/5">
          <div className="w-8 h-8 rounded-full bg-emerald-green/20 flex items-center justify-center text-emerald-green border border-emerald-green/50">
            <User size={16} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-white">Prof. Sarah</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
