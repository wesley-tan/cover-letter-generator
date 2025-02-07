import { Request, Response } from 'express';
import { 
  GenerateLetterRequest, 
  GenerateLetterResponse,
  AnalyzeJobRequest,
  AnalyzeJobResponse,
  ParseResumeRequest,
  ParseResumeResponse 
} from '../types';
import { generateLetterService, analyzeJobService, parseResumeService } from '../services/openAIService';

export const generateCoverLetter = async (req: Request<{}, {}, GenerateLetterRequest>, res: Response) => {
  try {
    // Validate request
    const { jobDescription, resumeText, preferences } = req.body;
    
    if (!jobDescription?.trim() || !resumeText?.trim()) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: {
          jobDescription: !jobDescription?.trim() ? 'Required' : undefined,
          resumeText: !resumeText?.trim() ? 'Required' : undefined
        }
      });
    }

    // Generate cover letter
    const result = await generateLetterService({
      jobDescription,
      resumeText,
      preferences: preferences || {
        tone: 'professional',
        length: 'medium'
      }
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Cover letter generation error:', error);
    return res.status(500).json({
      error: 'Failed to generate cover letter',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const analyzeJob = async (req: Request<{}, {}, AnalyzeJobRequest>, res: Response) => {
  try {
    const result = await analyzeJobService(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error analyzing job description',
      code: 500,
      timestamp: new Date().toISOString()
    });
  }
};

export const parseResume = async (req: Request<{}, {}, ParseResumeRequest>, res: Response) => {
  try {
    const result = await parseResumeService(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error parsing resume',
      code: 500,
      timestamp: new Date().toISOString()
    });
  }
}; 