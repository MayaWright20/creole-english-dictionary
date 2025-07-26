import AddWord from '@/components/inputs/add-word/add-word';
import Switch from '@/components/inputs/switch/switch';
import TestSet from '@/components/inputs/test-set/test-set';
import { useProgressiveDataLoading } from '@/hooks/use-progressive-loading';
import { useOptimizedStore } from '@/optimized-store';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function OptimizedIndex() {
  // Use optimized store
  const setOrderByEnglish = useOptimizedStore(
    (state) => state.setOrderByEnglish
  );
  const orderByEnglish = useOptimizedStore((state) => state.orderByEnglish);
  const setTestByEnglish = useOptimizedStore((state) => state.setTestByEnglish);
  const testByEnglish = useOptimizedStore((state) => state.testByEnglish);
  const setTestSetMin = useOptimizedStore((state) => state.setTestSetMin);
  const setTestSetMax = useOptimizedStore((state) => state.setTestSetMax);
  const testSetMin = useOptimizedStore((state) => state.testSetMin);
  const testSetMax = useOptimizedStore((state) => state.testSetMax);
  const setAllTestSet = useOptimizedStore((state) => state.setAllTestSet);

  // Use progressive loading hook
  const {
    isLoading,
    isDataLoaded,
    loadedCount,
    totalCount,
    loadMore,
    hasMoreData,
  } = useProgressiveDataLoading();

  // Load more data in background after initial load
  useEffect(() => {
    if (isDataLoaded && hasMoreData && loadedCount < 1000) {
      // Load more data in chunks after initial load
      const timer = setTimeout(() => {
        loadMore(500);
      }, 1000); // Wait 1 second after initial load

      return () => clearTimeout(timer);
    }
  }, [isDataLoaded, hasMoreData, loadedCount, loadMore]);

  // Show loading indicator only for initial load
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading dictionary...</Text>
      </View>
    );
  }

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
      {/* Show data loading progress */}
      {totalCount > 0 && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Loaded {loadedCount} of {totalCount} words
          </Text>
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  statusContainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
