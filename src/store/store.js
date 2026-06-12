import { create } from 'zustand';

const useStore = create((set) => ({
  activeChannel: {
    id: 'ch-1',
    name: 'Premier Sports HD',
    category: 'Football',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', 
    poster: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop'
  },
  setActiveChannel: (channel) => set({ activeChannel: channel }),
  
  // Global app state
  isPlayerLoading: true,
  setPlayerLoading: (status) => set({ isPlayerLoading: status }),
  
  // Category selection
  selectedCategory: 'fifa',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query })
}));

export default useStore;
