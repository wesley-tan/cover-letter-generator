import axios from 'axios';
import { 
  GenerateLetterRequest, 
  GenerateLetterResponse,
  AnalyzeJobRequest,
  AnalyzeJobResponse,
  ParseResumeRequest,
  ParseResumeResponse 
} from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Request:', request);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export const generateCoverLetter = async (data: GenerateLetterRequest): Promise<GenerateLetterResponse> => {
  const response = await api.post('/cover-letter/generate', data);
  return response.data;
};

export const analyzeJob = async (data: AnalyzeJobRequest): Promise<AnalyzeJobResponse> => {
  const response = await api.post('/cover-letter/analyze', data);
  return response.data;
};

export const parseResume = async (data: ParseResumeRequest): Promise<ParseResumeResponse> => {
  const response = await api.post('/cover-letter/parse-resume', data);
  return response.data;
}; 