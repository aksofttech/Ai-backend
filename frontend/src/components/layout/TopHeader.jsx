import React, { useEffect } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import { Sparkles } from 'lucide-react';
import useCurriculumStore from '@/store/curriculumStore';

export default function TopHeader() {
  const {
    books,
    selectedBookId,
    selectedChapterId,
    fetchBooks,
    setSelectedBookId,
    setSelectedChapterId,
  } = useCurriculumStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Derived dropdown option lists
  const classes = Array.from(new Set(books.map((b) => b.class)));
  
  // Find current book to resolve class & subject
  const selectedBook = books.find((b) => b.id === selectedBookId);
  const selectedClass = selectedBook?.class || '';
  const selectedSubject = selectedBook?.subject || '';

  // Subjects matching current class
  const subjects = books
    .filter((b) => b.class === selectedClass)
    .map((b) => b.subject);
  const uniqueSubjects = Array.from(new Set(subjects));

  // Chapters matching current book
  const chapters = selectedBook?.chapters || [];
  const selectedChapter = chapters.find((c) => c.id === selectedChapterId);

  const handleClassChange = (classVal) => {
    const matchingBook = books.find((b) => b.class === classVal);
    if (matchingBook) {
      setSelectedBookId(matchingBook.id);
    }
  };

  const handleSubjectChange = (subjectVal) => {
    const matchingBook = books.find(
      (b) => b.class === selectedClass && b.subject === subjectVal,
    );
    if (matchingBook) {
      setSelectedBookId(matchingBook.id);
    }
  };

  const handleChapterChange = (chapterTitle) => {
    const matchingChapter = chapters.find((c) => c.title === chapterTitle);
    if (matchingChapter) {
      setSelectedChapterId(matchingChapter.id);
    }
  };

  return (
    <header className="h-[70px] w-full flex items-center justify-between px-6 z-20">
      {/* Pill-shaped frosted glass bar for selections */}
      <div className="glass-panel rounded-full px-6 py-2 flex items-center gap-4 flex-1 max-w-3xl">
        <div className="w-1/3">
          <Dropdown 
            options={classes.length > 0 ? classes : ['Grade 10']} 
            placeholder="Select Class" 
            value={selectedClass} 
            onChange={handleClassChange}
            className="w-full"
          />
        </div>
        <div className="w-1/3">
          <Dropdown 
            options={uniqueSubjects.length > 0 ? uniqueSubjects : ['Computer Science']} 
            placeholder="Select Subject" 
            value={selectedSubject} 
            onChange={handleSubjectChange}
            className="w-full"
          />
        </div>
        <div className="w-1/3">
          <Dropdown 
            options={chapters.length > 0 ? chapters.map((c) => c.title) : ['Ch 2: Core Concepts']} 
            placeholder="Select Chapter" 
            value={selectedChapter?.title || ''} 
            onChange={handleChapterChange}
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
