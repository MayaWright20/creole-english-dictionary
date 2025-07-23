import DictionaryCard from '@/components/cards/dictionary-card';
import { PADDING } from '@/constants/styles';
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {WORDS.sort((a: WORD, b: WORD) =>
          a.english.localeCompare(b.english)
        ).map((item: WORD, index: number) => (
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
