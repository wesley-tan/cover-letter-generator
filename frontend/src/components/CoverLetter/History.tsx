import React, { useState } from 'react';
import { HistoryEntry } from '../../types';
import { historyService } from '../../services/historyService';

export const History: React.FC = () => {
  const [history, setHistory] = React.useState<HistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);

  React.useEffect(() => {
    setHistory(historyService.getHistory());
  }, []);

  if (history.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No generation history yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedEntry ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Cover Letter Details</h3>
            <button
              onClick={() => setSelectedEntry(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back to History
            </button>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Generated on {new Date(selectedEntry.timestamp).toLocaleString()}</p>
            <p className="text-sm text-gray-500 mb-4">Match Score: {selectedEntry.result.metadata.matchScore}%</p>
          </div>
          <div className="mb-6">
            <h4 className="font-medium mb-2">Job Description</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{selectedEntry.jobDescription}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Generated Cover Letter</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{selectedEntry.result.coverLetter}</p>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">Generation History</h2>
          {history.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="w-full text-left border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  Match Score: {entry.result.metadata.matchScore}%
                </div>
              </div>
              <div className="text-sm text-gray-600 line-clamp-2">
                {entry.jobDescription.substring(0, 150)}...
              </div>
            </button>
          ))}
        </>
      )}
    </div>
  );
};