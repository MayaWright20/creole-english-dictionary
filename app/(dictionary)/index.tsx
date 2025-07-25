import DictionaryCard from '@/components/cards/dictionary-card';
import SearchBar from '@/components/search-bar/search-bar';
import { PADDING } from '@/constants/styles';
import { useSearch } from '@/hooks/search-hook';
import { usePersistStore } from '@/store/store';
import { WORD } from '@/types';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function Dictionary() {
  const WORDS = usePersistStore((state: any) => state.words);
  const toggleFavourite = usePersistStore(
    (state: any) => state.toggleFavourite
  );

  const { search, setSearch, filteredWords } = useSearch(WORDS);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <SearchBar
        input={search}
        setSearchInput={(searchInput) => setSearch(searchInput)}
      />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {filteredWords
          .sort((a: WORD, b: WORD) => a.english.localeCompare(b.english))
          .map((item: WORD, index: number) => (
            <DictionaryCard
              onPressIsFavourite={() => toggleFavourite(item)}
              isFavourited={item.isFavourited}
              key={`${index}-${item.english}-${item.creole}`}
              title={item.english}
              description={item.creole}
            />
          ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom:
      typeof PADDING.XLARGE_PERCENTAGE === 'string'
        ? (PADDING.XLARGE_PERCENTAGE as `${number}%`)
        : PADDING.XLARGE_PERCENTAGE,
  },
});
