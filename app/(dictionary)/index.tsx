import DictionaryCard from '@/components/cards/dictionary-card';
import { usePersistStore } from '@/store/store';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

const DATA = [
  {
    english: 'hello',
    creole: 'bonjure',
  },
  { english: 'hello1', creole: 'bonjure1' },
];

export default function Dictionary() {
  const WORDS = usePersistStore((state: any) => state.words);

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
        {WORDS.map((item, index) => (
          <DictionaryCard
            key={index}
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
    flex: 1,
  },
});
