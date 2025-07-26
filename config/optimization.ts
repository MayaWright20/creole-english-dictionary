// Configuration for data loading optimization
export const DATA_OPTIMIZATION_CONFIG = {
  // Set to true to use optimized progressive loading
  USE_PROGRESSIVE_LOADING: true,

  // Chunk sizes for loading
  INITIAL_LOAD_SIZE: 100,
  CHUNK_SIZE: 500,
  BACKGROUND_LOAD_SIZE: 500,

  // Timing
  BACKGROUND_LOAD_DELAY: 1000, // ms

  // Memory management
  PERSIST_HEAVY_DATA: false,

  // Search optimization
  ENABLE_SEARCH_INDEXING: true,
};

// Performance monitoring
export const performanceLogger = {
  startTime: 0,

  start(operation: string) {
    this.startTime = Date.now();
    console.log(`🚀 Starting ${operation}...`);
  },

  end(operation: string) {
    const duration = Date.now() - this.startTime;
    console.log(`✅ ${operation} completed in ${duration}ms`);
  },

  log(message: string, data?: any) {
    console.log(`📊 ${message}`, data);
  },
};
