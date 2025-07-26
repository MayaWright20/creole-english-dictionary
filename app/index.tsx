import AddWord from '@/components/inputs/add-word/add-word';
import Switch from '@/components/inputs/switch/switch';
import TestSet from '@/components/inputs/test-set/test-set';
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
  const setTestSetMin = usePersistStore((state: any) => state.setTestSetMin);
  const setTestSetMax = usePersistStore((state: any) => state.setTestSetMax);

  const testSetMin = usePersistStore((state: any) => state.testSetMin);
  const testSetMax = usePersistStore((state: any) => state.testSetMax);
  const setAllTestSet = usePersistStore((state: any) => state.setAllTestSet);

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
      <TestSet
        setAllTestSet={() => setAllTestSet()}
        title={'Set Test set'}
        setTestSetMin={(value) => setTestSetMin(value)}
        setTestSetMax={(value) => setTestSetMax(value)}
        testSetMin={testSetMin}
        testSetMax={testSetMax}
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
