import OpenAI from 'openai';
import { GenerateLetterRequest, GenerateLetterResponse, AnalyzeJobRequest, ParseResumeRequest } from '../types';
import { config } from '../config/config';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

const calculateMatchScore = (jobDescription: string, resumeText: string): number => {
  // Convert both texts to lowercase for case-insensitive matching
  const jobDesc = jobDescription.toLowerCase();
  const resume = resumeText.toLowerCase();

  // Extract key terms from job description
  const jobTerms = jobDesc.match(/\b\w+\b/g) || [];
  const uniqueJobTerms = [...new Set(jobTerms)];

  // Count matches in resume
  let matches = 0;
  uniqueJobTerms.forEach(term => {
    if (resume.includes(term)) {
      matches++;
    }
  });

  // Calculate match score as percentage
  const score = matches / uniqueJobTerms.length;
  return Math.min(Math.round(score * 100) / 100, 1); // Return score between 0-1
};

const extractKeywordMatches = (jobDescription: string, resumeText: string): string[] => {
  // Common keywords to look for
  const commonKeywords = [
    'experience', 'skills', 'education', 'certification',
    'leadership', 'management', 'development', 'analysis',
    'communication', 'teamwork', 'problem-solving'
  ];

  // Convert to lowercase
  const jobDesc = jobDescription.toLowerCase();
  const resume = resumeText.toLowerCase();

  // Find matching keywords
  const matches = commonKeywords.filter(keyword => {
    return jobDesc.includes(keyword) && resume.includes(keyword);
  });

  // Extract additional technical/domain specific terms
  const technicalTerms = jobDesc.match(/\b[A-Za-z]+(?:\s[A-Za-z]+)*\b/g) || [];
  const additionalMatches = technicalTerms.filter(term => {
    return term.length > 3 && // Filter out short words
           !commonKeywords.includes(term.toLowerCase()) && // Exclude common keywords
           resume.toLowerCase().includes(term.toLowerCase()); // Check if in resume
  });

  return [...new Set([...matches, ...additionalMatches])]; // Remove duplicates
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY.replace(/["']/g, '') // Remove any quotes
});

export const generateLetterService = async (input: GenerateLetterRequest): Promise<GenerateLetterResponse> => {
  try {
    const prompt = `
      Write a cover letter based on the following:
      
      Job Description:
      ${input.jobDescription}
      
      Resume:
      ${input.resumeText}
      
      Tone: ${input.preferences?.tone || 'professional'}
      Length: ${input.preferences?.length || 'medium'}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional cover letter writer.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const coverLetter = response.choices[0].message.content || '';

    return {
      coverLetter,
      metadata: {
        matchScore: 85, // Placeholder - implement actual scoring
        keywordMatches: ['experience', 'skills'], // Placeholder - implement actual matching
        generationTime: 1.5 // Placeholder - implement actual timing
      }
    };
  } catch (error) {
    console.error('OpenAI service error:', error);
    throw new Error('Failed to generate cover letter');
  }
};

export const analyzeJobService = async (inputs: AnalyzeJobRequest) => {
  try {
    // TODO: Implement job analysis
    return {
      keyRequirements: [],
      suggestedSkills: [],
      companyCulture: "",
      jobLevel: ""
    };
  } catch (error) {
    throw new Error('Failed to analyze job description');
  }
};

export const parseResumeService = async (inputs: ParseResumeRequest) => {
  try {
    // TODO: Implement resume parsing
    return {
      skills: [],
      experience: [],
      education: []
    };
  } catch (error) {
    throw new Error('Failed to parse resume');
  }
}; 