import React from 'react';
import { GenerateForm } from '../components/CoverLetter/GenerateForm';

export const HomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Generate Your Cover Letter</h1>
      <GenerateForm />
    </div>
  );
}; 