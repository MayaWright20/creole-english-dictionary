import { getDataLength, loadData } from '@/data-loader';
import { StoreState } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Extended store state to handle loading
interface ExtendedStoreState extends StoreState {
  isDataLoaded: boolean;
  isLoading: boolean;
  loadWords: () => Promise<void>;
  dataLength: number;
  setDataLength: (length: number) => void;
}

export const usePersistStore = create<ExtendedStoreState>()(
  persist(
    (set, get) => ({
      words: [],
      isDataLoaded: false,
      isLoading: false,
      dataLength: 0,
      setDataLength: (length) => set({ dataLength: length }),
      loadWords: async () => {
        const { isDataLoaded, isLoading } = get();
        if (isDataLoaded || isLoading) return;

        set({ isLoading: true });
        try {
          const data = await loadData();
          const length = await getDataLength();
          set({
            words: data,
            isDataLoaded: true,
            isLoading: false,
            dataLength: length,
            testSetMax: length,
          });
        } catch (error) {
          console.error('Failed to load words:', error);
          set({ isLoading: false });
        }
      },
      setWords: (word) => set((state) => ({ words: [...state.words, word] })),
      reset: async () => {
        const data = await loadData();
        set({
          words: data,
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
      orderByEnglish: true,
      setOrderByEnglish: (value) => set((state) => ({ orderByEnglish: value })),
      testSetMin: 0,
      setTestSetMin: (value) => set((state) => ({ testSetMin: value })),
      testSetMax: 0,
      setTestSetMax: (value) => set((state) => ({ testSetMax: value })),
      setAllTestSet: () => {
        const { dataLength } = get();
        set({
          testSetMax: dataLength,
        });
      },
      testByEnglish: true,
      setTestByEnglish: (value) => set((state) => ({ testByEnglish: value })),
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
        })),
    }),
    {
      name: 'WORDS',
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
    }
  )
);

// export const useStore = create((set) => ({
//   pageNumber: 0,
//   increasePageNumber: () =>
//     set((state: any) => ({ pageNumber: state.pageNumber + 1 })),
//   decreasePageNumber: () =>
//     set((state: any) => ({ pageNumber: state.pageNumber - 1 })),
//   removeAllPageNumbers: () => set({ pageNumber: 0 }),
//   updatePageNumber: (newPageNumber: number) =>
//     set({ pageNumber: newPageNumber }),

//   isFormCTADisabled: true,
//   setIsFormCTADisabled: (value: boolean) => set({ isFormCTADisabled: value }),

//   // toggleLargCTADiabled: () =>
//   //   set((state: any) => ({ isFormCTADisabled: !state.isFormCTADisabled })),
//   // slideUpModalsContent: [
//   //   { title: <Text>hello</Text> },
//   //   { title: <Text>hello2</Text> },
//   // ],
//   // updateSlideUpModalsContent: (content: any[]) =>
//   //   set({ slideUpModalsContent: content }),

//   // TOGGLE
// }));
