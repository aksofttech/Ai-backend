import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
  user: null,
  token: Cookies.get('token') || null,
  isAuthenticated: !!Cookies.get('token'),

  setAuth: (user, token) => {
    Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    Cookies.remove('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  // You can also add a function to fetch/validate user profile on app load
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
