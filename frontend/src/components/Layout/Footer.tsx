import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase">About</h3>
            <p className="mt-4 text-gray-500">
              AI-powered cover letter generator to help you land your dream job.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Cover Letter Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 