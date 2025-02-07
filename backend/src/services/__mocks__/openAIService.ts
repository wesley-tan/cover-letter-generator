import { GenerateLetterResponse, AnalyzeJobResponse, ParseResumeResponse } from '../../types';

export const generateLetterService = jest.fn().mockResolvedValue({
  coverLetter: "This is a mock cover letter",
  metadata: {
    matchScore: 0.8,
    keywordMatches: ["skill", "experience"],
    generationTime: 1.5
  }
} as GenerateLetterResponse);

export const analyzeJobService = jest.fn().mockResolvedValue({
  keyRequirements: ["requirement1"],
  suggestedSkills: ["skill1"],
  companyCulture: "Professional",
  jobLevel: "Mid-level"
} as AnalyzeJobResponse);

export const parseResumeService = jest.fn().mockResolvedValue({
  skills: ["skill1"],
  experience: [],
  education: []
} as ParseResumeResponse); 