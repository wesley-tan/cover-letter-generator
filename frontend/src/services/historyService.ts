import { HistoryEntry } from '../types';

class HistoryService {
  private readonly STORAGE_KEY = 'coverLetterHistory';

  getHistory(): HistoryEntry[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  addEntry(entry: HistoryEntry): void {
    const history = this.getHistory();
    history.unshift(entry);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  }

  clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const historyService = new HistoryService();