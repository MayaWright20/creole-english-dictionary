import { WORD } from './types';

// Lazy loading function to load data asynchronously
export const loadData = async (): Promise<WORD[]> => {
  try {
    // Dynamic import to lazy load the data
    const { DATA } = await import('./data');
    return DATA;
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
};

// Function to load data in chunks
export const loadDataInChunks = async (
  chunkSize: number = 100
): Promise<WORD[]> => {
  try {
    const { DATA } = await import('./data');
    return DATA;
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
};

// Get a specific chunk of data
export const getDataChunk = async (
  start: number,
  end: number
): Promise<WORD[]> => {
  try {
    const { DATA } = await import('./data');
    return DATA.slice(start, end);
  } catch (error) {
    console.error('Error loading data chunk:', error);
    return [];
  }
};

// Get data length without loading all data
export const getDataLength = async (): Promise<number> => {
  try {
    const { DATA } = await import('./data');
    return DATA.length;
  } catch (error) {
    console.error('Error getting data length:', error);
    return 0;
  }
};
