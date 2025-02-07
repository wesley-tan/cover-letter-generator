export interface CoverLetterRequest {
  jobDescription: string;
  resumeText: string;
  preferences?: {
    tone?: 'professional' | 'casual' | 'enthusiastic';
    length?: 'short' | 'medium' | 'long';
    focus?: string[];
  }
}

export interface CoverLetterResponse {
  coverLetter: string;
  metadata: {
    matchScore: number;
    keywordMatches: string[];
    generationTime: number;
  }
}

export interface GenerateLetterRequest {
  jobDescription: string;
  resumeText: string;
  preferences?: {
    tone?: 'professional' | 'casual' | 'enthusiastic';
    length?: 'short' | 'medium' | 'long';
    focus?: string[];
  }
}

export interface GenerateLetterResponse {
  coverLetter: string;
  metadata: {
    matchScore: number;
    keywordMatches: string[];
    generationTime: number;
  }
}

export interface AnalyzeJobRequest {
  jobDescription: string;
}

export interface AnalyzeJobResponse {
  keyRequirements: string[];
  suggestedSkills: string[];
  companyCulture: string;
  jobLevel: string;
}

export interface ParseResumeRequest {
  resumeText: string;
  fileType?: string;
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

export interface HistoryEntry {
  id: string;
  timestamp: Date;
  jobDescription: string;
  resumeText: string;
  preferences: {
    tone: string;
    length: string;
  };
  result: {
    coverLetter: string;
    metadata: {
      matchScore: number;
      keywordMatches: string[];
    }
  };
}