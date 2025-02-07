import React from 'react';
import { useForm } from 'react-hook-form';
import { GenerateLetterRequest } from '../../types';
import { Button } from '../ui/Button';
import { TextArea } from '../ui/TextArea';
import { Select } from '../ui/Select';
import { generateCoverLetter } from '../../services/api';
import { toast } from 'react-toastify';
import { historyService } from '../../services/historyService';

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'enthusiastic', label: 'Enthusiastic' }
];

const LENGTH_OPTIONS = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' }
];

export const GenerateForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<GenerateLetterRequest>({
    defaultValues: {
      jobDescription: '',
      resumeText: '',
      preferences: {
        tone: 'professional',
        length: 'medium'
      }
    }
  });

  const [result, setResult] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: GenerateLetterRequest) => {
    if (!data.jobDescription.trim() || !data.resumeText.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Sending request:', data); // Debug log
      const response = await generateCoverLetter(data);
      console.log('Received response:', response); // Debug log
      setResult(response.coverLetter);
      
      // Save to history
      historyService.addEntry({
        id: Date.now().toString(),
        timestamp: new Date(),
        jobDescription: data.jobDescription,
        resumeText: data.resumeText,
        preferences: {
          tone: data.preferences?.tone || 'professional',
          length: data.preferences?.length || 'medium'
        },
        result: response
      });

      toast.success('Cover letter generated successfully!');
    } catch (error) {
      console.error('Generation error:', error); // Debug log
      toast.error('Failed to generate cover letter. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <TextArea
          label="Job Description"
          {...register('jobDescription', { 
            required: true,
            validate: value => value.trim().length >= 10 || 'Job description must be at least 10 characters'
          })}
          error={errors.jobDescription?.message}
          placeholder="Paste the job description here..."
        />
      </div>

      <div>
        <TextArea
          label="Resume"
          {...register('resumeText', { 
            required: true,
            validate: value => value.trim().length >= 10 || 'Resume must be at least 10 characters'
          })}
          error={errors.resumeText?.message}
          placeholder="Paste your resume here..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Tone"
          options={TONE_OPTIONS}
          {...register('preferences.tone')}
        />
        <Select
          label="Length"
          options={LENGTH_OPTIONS}
          {...register('preferences.length')}
        />
      </div>

      <Button 
        type="submit" 
        isLoading={isLoading}
        disabled={isLoading}
        className="w-full"
      >
        Generate Cover Letter
      </Button>

      {result && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Generated Cover Letter</h3>
          <div className="whitespace-pre-wrap">{result}</div>
        </div>
      )}

      {isLoading && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
          Generating your cover letter...
        </div>
      )}
    </form>
  );
}; 