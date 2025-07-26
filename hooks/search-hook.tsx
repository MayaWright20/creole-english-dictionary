import { useEffect, useState } from 'react';
import { WORD } from '../types';

export function useSearch(words: WORD[]) {
  const [search, setSearch] = useState('');
  const [filteredWords, setFilteredWords] = useState(words);

  useEffect(() => {
    if (search.trim() !== '') {
      const filtered = words.filter((item: WORD) => {
        const searchTerm = search.toLowerCase();
        const englishWord = item.english.toLowerCase();
        const creoleWord = item.creole.toLowerCase();
        return (
          englishWord.includes(searchTerm) || creoleWord.includes(searchTerm)
        );
      });
      setFilteredWords(filtered);
    } else {
      setFilteredWords(words);
    }
  }, [search, words]);

  return {
    search,
    setSearch,
    filteredWords,
  };
}
