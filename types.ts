export interface WORD {
  id: number;
  isFavourited: boolean;
  english: string;
  creole: string;
}

export type StoreState = {
  words: WORD[];
  setWords: (input: WORD) => void;
  reset: () => void;
  favourites: WORD[];
  toggleFavourite: (word: WORD) => void;
  orderByEnglish: boolean;
  setOrderByEnglish: (value: boolean) => void;
};
