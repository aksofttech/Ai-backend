import { create } from 'zustand';
import api from '@/services/api';

const useCurriculumStore = create((set, get) => ({
  books: [],
  selectedBookId: '',
  selectedChapterId: '',
  isLoading: false,

  fetchBooks: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/curriculum/books');
      // The API response might wrap the actual data under 'data' due to NestJS conventions or the TransformInterceptor
      const data = response.data?.data || response.data;
      const books = Array.isArray(data) ? data : [];
      
      set({ books });

      // If we have books and no book is selected yet, default select the first book and chapter
      if (books.length > 0 && !get().selectedBookId) {
        const firstBook = books[0];
        set({ selectedBookId: firstBook.id });
        if (firstBook.chapters && firstBook.chapters.length > 0) {
          set({ selectedChapterId: firstBook.chapters[0].id });
        }
      }
    } catch (err) {
      console.warn('Failed to fetch books in curriculumStore:', err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedBookId: (bookId) => {
    const book = get().books.find((b) => b.id === bookId);
    set({
      selectedBookId: bookId,
      selectedChapterId: book?.chapters?.[0]?.id || '',
    });
  },

  setSelectedChapterId: (chapterId) => {
    set({ selectedChapterId: chapterId });
  },
}));

export default useCurriculumStore;
