import request from 'supertest';
import express, { RequestHandler } from 'express';
import { generateCoverLetter } from '../controllers/coverLetterController';
import { validateRequest } from '../middleware/validation';
import { describe, it, expect, jest } from '@jest/globals';

// Mock the OpenAI service
jest.mock('../services/openAIService');

const app = express();
app.use(express.json());
app.post('/generate', validateRequest('generate'), generateCoverLetter as unknown as RequestHandler);

describe('Cover Letter Controller', () => {
  it('should return 400 if job description is missing', async () => {
    const response = await request(app)
      .post('/generate')
      .send({ resumeText: 'test resume' });
    
    expect(response.status).toBe(400);
  });

  it('should return 400 if resume is missing', async () => {
    const response = await request(app)
      .post('/generate')
      .send({ jobDescription: 'test job' });
    
    expect(response.status).toBe(400);
  });

  it('should return 400 if job description is empty string', async () => {
    const response = await request(app)
      .post('/generate')
      .send({ 
        jobDescription: '',
        resumeText: 'test resume'
      });
    
    expect(response.status).toBe(400);
  });

  it('should return 400 if resume text is empty string', async () => {
    const response = await request(app)
      .post('/generate')
      .send({ 
        jobDescription: 'test job',
        resumeText: ''
      });
    
    expect(response.status).toBe(400);
  });

  it('should accept valid preferences object', async () => {
    const response = await request(app)
      .post('/generate')
      .send({
        jobDescription: 'test job',
        resumeText: 'test resume',
        preferences: {
          tone: 'professional',
          length: 'medium',
          focus: ['skills', 'experience']
        }
      });
    
    expect(response.status).toBe(200);
  });

  it('should return 400 for invalid tone preference', async () => {
    const response = await request(app)
      .post('/generate')
      .send({
        jobDescription: 'test job',
        resumeText: 'test resume',
        preferences: {
          tone: 'invalid-tone',
          length: 'medium'
        }
      });
    
    expect(response.status).toBe(400);
  });

  it('should return 400 for invalid length preference', async () => {
    const response = await request(app)
      .post('/generate')
      .send({
        jobDescription: 'test job',
        resumeText: 'test resume',
        preferences: {
          tone: 'professional',
          length: 'invalid-length'
        }
      });
    
    expect(response.status).toBe(400);
  });

  it('should return success response with metadata', async () => {
    const response = await request(app)
      .post('/generate')
      .send({
        jobDescription: 'test job description',
        resumeText: 'test resume content'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('coverLetter');
    expect(response.body).toHaveProperty('metadata');
    expect(response.body.metadata).toHaveProperty('matchScore');
    expect(response.body.metadata).toHaveProperty('keywordMatches');
    expect(response.body.metadata).toHaveProperty('generationTime');
  });
}); 