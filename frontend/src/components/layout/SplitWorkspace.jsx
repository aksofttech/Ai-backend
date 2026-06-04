import React from 'react';

export default function SplitWorkspace({ children }) {
  return (
    <div className="flex-1 flex overflow-hidden p-6 gap-6 pt-0">
      {/* Left Workspace Panel (Fixed 40%) - Textbook Reader */}
      <div className="w-[40%] h-full flex flex-col glass-panel rounded-2xl overflow-hidden relative">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-obsidian/80 backdrop-blur-md border-b border-glass-border p-4">
          <h2 className="text-lg font-semibold text-white">Textbook Reader</h2>
          <p className="text-xs text-gray-400">Chapter 2: Core Concepts - Page 42</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 text-gray-300 leading-relaxed text-sm">
          <p>
            The fundamental principles of artificial intelligence are rooted in the concept of machine learning,
            where systems improve their performance on a given task by analyzing vast amounts of data.
          </p>
          
          <div className="p-4 rounded-xl bg-neon-purple/10 border border-neon-purple/30">
            <h4 className="text-neon-purple font-medium mb-2">Key Concept Highlight</h4>
            <p className="text-gray-200">
              Neural networks mimic the human brain's interconnected neuron structure, allowing complex pattern recognition
              and deep learning capabilities.
            </p>
          </div>

          <p>
            In natural language processing (NLP), models use these networks to understand context, semantics, and syntax.
            This forms the basis for modern conversational agents and generative models.
            <br/><br/>
            Another crucial aspect is reinforcement learning, where an agent learns to make decisions by performing actions
            in an environment to maximize a reward signal. This approach has led to significant breakthroughs in robotics
            and complex game playing.
          </p>
          <p>
            The integration of these technologies into educational software enables personalized learning pathways,
            instant feedback, and adaptive testing mechanisms that cater to the unique needs of each student.
          </p>
          <div className="h-20"></div> {/* Spacer for scroll bottom */}
        </div>
      </div>

      {/* Right Workspace Panel (Dynamic 60%) - AI Orchestration Canvas */}
      <div className="w-[60%] h-full flex flex-col relative rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}
