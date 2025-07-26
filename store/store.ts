import { DATA } from '@/data';
import { StoreState } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePersistStore = create<StoreState>()(
  persist(
    (set) => ({
      words: DATA,
      setWords: (word) => set((state) => ({ words: [...state.words, word] })),
      reset: () =>
        set({
          words: DATA,
          favourites: [],
        }),
      orderByEnglish: true,
      setOrderByEnglish: (value) => set((state) => ({ orderByEnglish: value })),
      favourites: [],
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
