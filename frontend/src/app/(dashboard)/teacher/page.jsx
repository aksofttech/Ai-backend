"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopHeader from '@/components/layout/TopHeader';
import SplitWorkspace from '@/components/layout/SplitWorkspace';

// Feature Components
import ChatWithBook from '@/components/features/ChatWithBook';
import AILessonPlan from '@/components/features/AILessonPlan';
import WorksheetGen from '@/components/features/WorksheetGen';
import CustomWorksheet from '@/components/features/CustomWorksheet';
import AnswerKeyGen from '@/components/features/AnswerKeyGen';
import AIPPTGen from '@/components/features/AIPPTGen';
import TestPaperGen from '@/components/features/TestPaperGen';
import AIHomeworkGen from '@/components/features/AIHomeworkGen';

export default function Dashboard() {
  const [activeTool, setActiveTool] = useState('chat');

  const renderTool = () => {
    switch (activeTool) {
      case 'chat': return <ChatWithBook />;
      case 'lesson': return <AILessonPlan />;
      case 'worksheet': return <WorksheetGen />;
      case 'custom-worksheet': return <CustomWorksheet />;
      case 'answer-key': return <AnswerKeyGen />;
      case 'ppt': return <AIPPTGen />;
      case 'test-paper': return <TestPaperGen />;
      case 'homework': return <AIHomeworkGen />;
      default: return <ChatWithBook />;
    }
  };

  return (
    <div className="h-full flex overflow-hidden">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopHeader />
        <SplitWorkspace>
          {renderTool()}
        </SplitWorkspace>
      </div>
    </div>
  );
}
