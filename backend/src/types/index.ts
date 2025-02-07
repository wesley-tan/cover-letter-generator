// API Request Types
export interface GenerateLetterRequest {
  jobDescription: string;
  resumeText: string;
  preferences?: {
    tone?: 'professional' | 'casual' | 'enthusiastic';
    length?: 'short' | 'medium' | 'long';
    focus?: string[];
  }
}

export interface AnalyzeJobRequest {
  jobDescription: string;
}

export interface ParseResumeRequest {
  resume: string;
}

// API Response Types
export interface GenerateLetterResponse {
  coverLetter: string;
  metadata: {
    matchScore: number;
    keywordMatches: string[];
    generationTime: number;
  }
}

export interface AnalyzeJobResponse {
  keyRequirements: string[];
  suggestedSkills: string[];
  companyCulture: string;
  jobLevel: string;
}

export interface ParseResumeResponse {
  skills: string[];
  experience: {
    title: string;
    company: string;
    duration: string;
    highlights: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

// Error Types
export enum ErrorCodes {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND'
}

export interface ErrorResponse {
  error: string;
  code: ErrorCodes;
  details?: any;
  timestamp: string;
  requestId: string;
}