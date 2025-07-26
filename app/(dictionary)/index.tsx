import DictionaryCard from '@/components/cards/dictionary-card';
import SearchBar from '@/components/search-bar/search-bar';
import { COLORS, FONT_WEIGHT, MARGIN, PADDING } from '@/constants/styles';
import { useSearch } from '@/hooks/search-hook';
import { usePersistStore } from '@/store/store';
import { WORD } from '@/types';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Dictionary() {
  const WORDS = usePersistStore((state: any) => state.words);
  const toggleFavourite = usePersistStore(
    (state: any) => state.toggleFavourite
  );
  const orderByEnglish = usePersistStore((state: any) => state.orderByEnglish);

  const { search, setSearch, filteredWords } = useSearch(WORDS);

  const sortedWords = filteredWords.sort((a: WORD, b: WORD) => {
    if (orderByEnglish) {
      return a.english.localeCompare(b.english);
    } else {
      return a.creole.localeCompare(b.creole);
    }
  });

  const renderItem = ({ item, index }: { item: WORD; index: number }) => {
    const currentWord = orderByEnglish ? item.english : item.creole;
    const nextWord = sortedWords[index + 1]
      ? orderByEnglish
        ? sortedWords[index + 1].english
        : sortedWords[index + 1].creole
      : null;

    const showSeparator =
      nextWord &&
      currentWord.charAt(0).toUpperCase() !== nextWord.charAt(0).toUpperCase();

    if (showSeparator) {
      return (
        <View key={`${index}-${item.english}-${item.creole}`}>
          <DictionaryCard
            onPressIsFavourite={() => toggleFavourite(item)}
            isFavourited={item.isFavourited}
            title={orderByEnglish ? item.english : item.creole}
            description={orderByEnglish ? item.creole : item.english}
          />
          <Text style={styles.title}>{nextWord.charAt(0).toUpperCase()}</Text>
        </View>
      );
    } else {
      return (
        <DictionaryCard
          onPressIsFavourite={() => toggleFavourite(item)}
          isFavourited={item.isFavourited}
          key={`${index}-${item.english}-${item.creole}`}
          title={orderByEnglish ? item.english : item.creole}
          description={orderByEnglish ? item.creole : item.english}
        />
      );
    }
  };

  const ListHeaderComponent = () => <Text style={styles.title}>A</Text>;

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
      <FlatList
        data={sortedWords}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          `${index}-${item.english}-${item.creole}`
        }
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
      />
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
  title: {
    fontSize: 50,
    fontWeight: FONT_WEIGHT.MEDIUM as any,
    color: COLORS.BLUE,
    margin: MARGIN.XLARGE,
  },
});
