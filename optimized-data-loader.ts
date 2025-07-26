import { WORD } from './types';

// Configuration for chunked loading
const CHUNK_SIZE = 500; // Load 500 words at a time
const INITIAL_LOAD_SIZE = 100; // Load first 100 words immediately

class DataManager {
  private loadedChunks: Set<number> = new Set();
  private allData: WORD[] | null = null;
  private totalLength: number = 0;

  // Get data length without loading all data
  async getDataLength(): Promise<number> {
    if (this.totalLength > 0) return this.totalLength;

    try {
      const { DATA } = await import('./data');
      this.totalLength = DATA.length;
      return this.totalLength;
    } catch (error) {
      console.error('Error getting data length:', error);
      return 0;
    }
  }

  // Load initial chunk for immediate use
  async loadInitialData(): Promise<WORD[]> {
    try {
      const { DATA } = await import('./data');
      this.allData = DATA;
      this.totalLength = DATA.length;
      return DATA.slice(0, INITIAL_LOAD_SIZE);
    } catch (error) {
      console.error('Error loading initial data:', error);
      return [];
    }
  }

  // Load a specific chunk of data
  async loadChunk(chunkIndex: number): Promise<WORD[]> {
    if (this.loadedChunks.has(chunkIndex)) {
      return this.getChunkData(chunkIndex);
    }

    try {
      if (!this.allData) {
        const { DATA } = await import('./data');
        this.allData = DATA;
        this.totalLength = DATA.length;
      }

      this.loadedChunks.add(chunkIndex);
      return this.getChunkData(chunkIndex);
    } catch (error) {
      console.error(`Error loading chunk ${chunkIndex}:`, error);
      return [];
    }
  }

  // Get chunk data from memory
  private getChunkData(chunkIndex: number): WORD[] {
    if (!this.allData) return [];

    const startIndex = chunkIndex * CHUNK_SIZE;
    const endIndex = Math.min(startIndex + CHUNK_SIZE, this.allData.length);
    return this.allData.slice(startIndex, endIndex);
  }

  // Load data in range
  async loadRange(start: number, end: number): Promise<WORD[]> {
    try {
      if (!this.allData) {
        const { DATA } = await import('./data');
        this.allData = DATA;
        this.totalLength = DATA.length;
      }

      return this.allData.slice(start, Math.min(end, this.allData.length));
    } catch (error) {
      console.error(`Error loading range ${start}-${end}:`, error);
      return [];
    }
  }

  // Search within loaded data
  async searchData(
    query: string,
    language: 'english' | 'creole' = 'english'
  ): Promise<WORD[]> {
    try {
      if (!this.allData) {
        const { DATA } = await import('./data');
        this.allData = DATA;
        this.totalLength = DATA.length;
      }

      const lowercaseQuery = query.toLowerCase();
      return this.allData.filter((word) =>
        word[language].toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error('Error searching data:', error);
      return [];
    }
  }

  // Get all data (use sparingly)
  async getAllData(): Promise<WORD[]> {
    try {
      if (!this.allData) {
        const { DATA } = await import('./data');
        this.allData = DATA;
        this.totalLength = DATA.length;
      }
      return this.allData;
    } catch (error) {
      console.error('Error loading all data:', error);
      return [];
    }
  }

  // Clear cache
  clearCache(): void {
    this.loadedChunks.clear();
    this.allData = null;
    this.totalLength = 0;
  }
}

// Singleton instance
export const dataManager = new DataManager();

// Legacy functions for backward compatibility
export const loadData = () => dataManager.getAllData();
export const getDataLength = () => dataManager.getDataLength();
export const loadDataInChunks = (chunkSize: number = 100) =>
  dataManager.getAllData();
export const getDataChunk = (start: number, end: number) =>
  dataManager.loadRange(start, end);
