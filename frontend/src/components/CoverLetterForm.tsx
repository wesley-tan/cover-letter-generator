import { useState } from 'react';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';
import { Alert } from './ui/Alert';
import { GenerationOptions } from './CoverLetter/GenerationOptions';
import { generateCoverLetter } from '../services/api';
import { validateForm } from '../utils/validation';
import type { CoverLetterResponse } from '../types';

export default function CoverLetterForm() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'enthusiastic'>('professional');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CoverLetterResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    jobDescription?: string;
    resumeText?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm(jobDescription, resumeText);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsLoading(true);
    setError(null);

    try {
      const response = await generateCoverLetter({
        jobDescription,
        resumeText,
        preferences: {
          tone,
          length
        }
      });
      setResult(response);
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert type="error" title="Error">
          {error}
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <label 
            htmlFor="jobDescription" 
            className="block text-sm font-medium text-gray-700"
          >
            Job Description
          </label>
          <TextArea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            error={validationErrors.jobDescription}
            className="mt-1"
          />
        </div>

        <div>
          <label 
            htmlFor="resumeText" 
            className="block text-sm font-medium text-gray-700"
          >
            Your Resume
          </label>
          <TextArea
            id="resumeText"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            error={validationErrors.resumeText}
            className="mt-1"
          />
        </div>

        <GenerationOptions
          tone={tone}
          length={length}
          onToneChange={setTone}
          onLengthChange={setLength}
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Generate Cover Letter
        </Button>
      </div>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Generated Cover Letter</h3>
          <div className="mt-2 rounded-md bg-white p-4 shadow">
            <pre className="whitespace-pre-wrap text-sm">
              {result.coverLetter}
            </pre>
          </div>
          {result.metadata && (
            <div className="mt-2 text-sm text-gray-500">
              Match Score: {result.metadata.matchScore}%
              <br />
              Key Matches: {result.metadata.keywordMatches.join(', ')}
            </div>
          )}
        </div>
      )}
    </form>
  );
} 