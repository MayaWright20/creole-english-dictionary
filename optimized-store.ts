import { dataManager } from '@/optimized-data-loader';
import { StoreState, WORD } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Extended store state with progressive loading
interface OptimizedStoreState extends Omit<StoreState, 'loadWords'> {
  loadedWords: WORD[];
  isInitialDataLoaded: boolean;
  isLoadingInitial: boolean;
  isLoadingMore: boolean;
  loadInitialData: () => Promise<void>;
  loadMoreData: (start: number, end: number) => Promise<void>;
  searchWords: (
    query: string,
    language?: 'english' | 'creole'
  ) => Promise<WORD[]>;
  clearCache: () => void;
}

export const useOptimizedStore = create<OptimizedStoreState>()(
  persist(
    (set, get) => ({
      // Basic word data
      words: [],
      loadedWords: [],

      // Loading states
      isDataLoaded: false,
      isInitialDataLoaded: false,
      isLoading: false,
      isLoadingInitial: false,
      isLoadingMore: false,

      // Data info
      dataLength: 0,

      // Load initial small chunk for immediate use
      loadInitialData: async () => {
        const { isInitialDataLoaded, isLoadingInitial } = get();
        if (isInitialDataLoaded || isLoadingInitial) return;

        set({ isLoadingInitial: true });
        try {
          const initialData = await dataManager.loadInitialData();
          const length = await dataManager.getDataLength();

          set({
            loadedWords: initialData,
            words: initialData,
            isInitialDataLoaded: true,
            isLoadingInitial: false,
            dataLength: length,
            testSetMax: length,
            isDataLoaded: true,
          });
        } catch (error) {
          console.error('Failed to load initial data:', error);
          set({ isLoadingInitial: false });
        }
      },

      // Load more data in chunks
      loadMoreData: async (start: number, end: number) => {
        const { isLoadingMore } = get();
        if (isLoadingMore) return;

        set({ isLoadingMore: true });
        try {
          const moreData = await dataManager.loadRange(start, end);
          set((state) => ({
            loadedWords: [...state.loadedWords, ...moreData],
            words: [...state.loadedWords, ...moreData],
            isLoadingMore: false,
          }));
        } catch (error) {
          console.error('Failed to load more data:', error);
          set({ isLoadingMore: false });
        }
      },

      // Search functionality
      searchWords: async (
        query: string,
        language: 'english' | 'creole' = 'english'
      ) => {
        try {
          return await dataManager.searchData(query, language);
        } catch (error) {
          console.error('Search failed:', error);
          return [];
        }
      },

      // Clear cache
      clearCache: () => {
        dataManager.clearCache();
        set({
          words: [],
          loadedWords: [],
          isDataLoaded: false,
          isInitialDataLoaded: false,
          dataLength: 0,
        });
      },

      // Legacy methods
      setDataLength: (length) => set({ dataLength: length }),
      setWords: (word) =>
        set((state) => ({
          words: [...state.words, word],
          loadedWords: [...state.loadedWords, word],
        })),

      reset: async () => {
        const initialData = await dataManager.loadInitialData();
        set({
          words: initialData,
          loadedWords: initialData,
          favourites: [
            {
              id: 0,
              isFavourited: false,
              english: 'Sweetheart',
              creole: 'Sousou',
            },
          ],
        });
      },

      // Settings
      orderByEnglish: true,
      setOrderByEnglish: (value) => set({ orderByEnglish: value }),

      // Test settings
      testSetMin: 0,
      setTestSetMin: (value) => set({ testSetMin: value }),
      testSetMax: 0,
      setTestSetMax: (value) => set({ testSetMax: value }),
      setAllTestSet: () => {
        const { dataLength } = get();
        set({ testSetMax: dataLength });
      },
      testByEnglish: true,
      setTestByEnglish: (value) => set({ testByEnglish: value }),

      // Favourites
      favourites: [
        {
          id: 0,
          isFavourited: false,
          english: 'Sweetheart',
          creole: 'Sousou',
        },
      ],
      toggleFavourite: (value) =>
        set((state) => ({
          favourites: state.favourites.some((fav) => fav.id === value.id)
            ? state.favourites.filter((fav) => fav.id !== value.id)
            : [...state.favourites, value],
          words: state.words.map((word) =>
            word.id === value.id
              ? { ...word, isFavourited: !word.isFavourited }
              : word
          ),
          loadedWords: state.loadedWords.map((word) =>
            word.id === value.id
              ? { ...word, isFavourited: !word.isFavourited }
              : word
          ),
        })),
    }),
    {
      name: 'OPTIMIZED_WORDS',
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
      // Don't persist heavy data arrays - only persist settings
      partialize: (state) => ({
        ...state,
        words: [], // Don't persist large data arrays
        loadedWords: [], // Don't persist large data arrays
      }),
    }
  )
);
