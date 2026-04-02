import { create } from 'zustand';
import supabase from '../lib/supabase';

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session?.user || null, loading: false });

    supabase.auth.onAuthStateChange((event, session) => {
      set({ user: session?.user || null, loading: false });
    });
  },
}));

// Initialize on import
useAuthStore.getState().initialize();

export default useAuthStore;