import AddWord from '@/components/inputs/add-word/add-word';
import Switch from '@/components/inputs/switch/switch';
import { usePersistStore } from '@/store/store';
import { ScrollView, StyleSheet } from 'react-native';

export default function Index() {
  const setOrderByEnglish = usePersistStore(
    (state: any) => state.setOrderByEnglish
  );
  const orderByEnglish = usePersistStore((state: any) => state.orderByEnglish);
  const setTestByEnglish = usePersistStore(
    (state: any) => state.setTestByEnglish
  );
  const testByEnglish = usePersistStore((state: any) => state.testByEnglish);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AddWord />
      <Switch
        orderBy={orderByEnglish}
        setOrderBy={(value) => setOrderByEnglish(value)}
        title="Order by"
      />
      <Switch
        title="Test by"
        setOrderBy={(value) => setTestByEnglish(value)}
        orderBy={testByEnglish}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '50%',
    minHeight: '100%',
  },
});
