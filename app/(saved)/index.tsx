import DictionaryCard from '@/components/cards/dictionary-card';
import SearchBar from '@/components/search-bar/search-bar';
import { useSearch } from '@/hooks/search-hook';
import { usePersistStore } from '@/store/store';
import { WORD } from '@/types';
import { StyleSheet, View } from 'react-native';

export default function Saved() {
  const favourites = usePersistStore((state: any) => state.favourites);
  const toggleFavourite = usePersistStore(
    (state: any) => state.toggleFavourite
  );
  const { search, setSearch, filteredWords } = useSearch(favourites);
  return (
    <View style={styles.container}>
      <SearchBar
        input={search}
        setSearchInput={(searchInput) => setSearch(searchInput)}
      />
      {filteredWords.map((item: WORD, index: number) => {
        return (
          <DictionaryCard
            key={index}
            title={item.english}
            description={item.creole}
            isFavourited={true}
            onPressIsFavourite={() => toggleFavourite(item)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
