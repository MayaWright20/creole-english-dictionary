// store/useAppStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WORDS {
  english: string;
  creole: string;
}

type StoreState = {
  words: WORDS[];
  setWords: (input: WORDS) => void;
  reset: () => void;
};

export const usePersistStore = create<StoreState>()(
  persist(
    (set) => ({
      words: [],
      setWords: (name) => set((state) => ({ words: [...state.words, name] })),
      reset: () => set({ words: [] }),
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
