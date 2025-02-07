import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../types';

const VALID_TONES = ['professional', 'casual', 'enthusiastic'];
const VALID_LENGTHS = ['short', 'medium', 'long'];

export const validateRequest = (type: 'generate' | 'analyze' | 'parse') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    switch (type) {
      case 'generate':
        const { jobDescription, resumeText, preferences } = req.body;
        
        // Check required fields
        if (!jobDescription?.trim() || !resumeText?.trim()) {
          res.status(400).json({
            error: 'Missing required fields',
            code: ErrorCodes.VALIDATION_ERROR,
            details: {
              jobDescription: !jobDescription?.trim() ? 'Required' : undefined,
              resumeText: !resumeText?.trim() ? 'Required' : undefined
            },
            timestamp: new Date().toISOString()
          });
          return;
        }

        // Validate preferences if provided
        if (preferences) {
          if (preferences.tone && !VALID_TONES.includes(preferences.tone)) {
            res.status(400).json({
              error: 'Invalid tone preference',
              code: ErrorCodes.VALIDATION_ERROR,
              details: {
                tone: `Must be one of: ${VALID_TONES.join(', ')}`
              },
              timestamp: new Date().toISOString()
            });
            return;
          }

          if (preferences.length && !VALID_LENGTHS.includes(preferences.length)) {
            res.status(400).json({
              error: 'Invalid length preference',
              code: ErrorCodes.VALIDATION_ERROR,
              details: {
                length: `Must be one of: ${VALID_LENGTHS.join(', ')}`
              },
              timestamp: new Date().toISOString()
            });
            return;
          }
        }
        
        next();
        break;
        
      case 'analyze':
        if (!req.body.jobDescription) {
          res.status(400).json({
            error: 'Job description is required',
            code: ErrorCodes.VALIDATION_ERROR,
            timestamp: new Date().toISOString()
          });
          return;
        }
        break;
    }
  };
}; 