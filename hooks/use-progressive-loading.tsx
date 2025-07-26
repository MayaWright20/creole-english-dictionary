import { useOptimizedStore } from '@/optimized-store';
import { useCallback, useEffect } from 'react';

export const useProgressiveDataLoading = () => {
  const loadInitialData = useOptimizedStore((state) => state.loadInitialData);
  const isInitialDataLoaded = useOptimizedStore(
    (state) => state.isInitialDataLoaded
  );
  const isLoadingInitial = useOptimizedStore((state) => state.isLoadingInitial);
  const dataLength = useOptimizedStore((state) => state.dataLength);
  const loadedWords = useOptimizedStore((state) => state.loadedWords);
  const loadMoreData = useOptimizedStore((state) => state.loadMoreData);
  const isLoadingMore = useOptimizedStore((state) => state.isLoadingMore);

  // Load initial data on mount
  useEffect(() => {
    if (!isInitialDataLoaded && !isLoadingInitial) {
      loadInitialData();
    }
  }, [isInitialDataLoaded, isLoadingInitial, loadInitialData]);

  // Function to load more data when needed
  const loadMore = useCallback(
    async (amount: number = 500) => {
      if (isLoadingMore) return;

      const currentCount = loadedWords.length;
      const endIndex = Math.min(currentCount + amount, dataLength);

      if (currentCount < dataLength) {
        await loadMoreData(currentCount, endIndex);
      }
    },
    [isLoadingMore, loadedWords.length, dataLength, loadMoreData]
  );

  return {
    isLoading: isLoadingInitial,
    isLoadingMore,
    isDataLoaded: isInitialDataLoaded,
    loadedCount: loadedWords.length,
    totalCount: dataLength,
    loadMore,
    hasMoreData: loadedWords.length < dataLength,
  };
};
