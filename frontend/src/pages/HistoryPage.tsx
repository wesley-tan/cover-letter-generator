import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { History } from '../components/CoverLetter/History';
import { historyService } from '../services/historyService';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const history = historyService.getHistory();
  
  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Generation History</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-center py-8">
            No cover letters generated yet.
          </p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/')}
            className="mx-auto block"
          >
            Generate Your First Letter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Generation History</h1>
      <History />
    </div>
  );
}; 