import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../types';

const MAX_TEXT_LENGTH = 10000; // 10KB of text

export const validateGenerateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { jobDescription, resumeText, preferences } = req.body;
  
  if (!jobDescription?.trim() || !resumeText?.trim()) {
    res.status(400).json({
      error: 'Missing required fields',
      code: ErrorCodes.VALIDATION_ERROR,
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (jobDescription.length > MAX_TEXT_LENGTH || resumeText.length > MAX_TEXT_LENGTH) {
    res.status(400).json({
      error: 'Text too long',
      code: ErrorCodes.VALIDATION_ERROR,
      timestamp: new Date().toISOString()
    });
    return;
  }

  next();
};

export const validateAnalyzeRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { jobDescription } = req.body;
  
  if (!jobDescription?.trim()) {
    res.status(400).json({
      error: 'Job description is required',
      code: ErrorCodes.VALIDATION_ERROR,
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (jobDescription.length > MAX_TEXT_LENGTH) {
    res.status(400).json({
      error: 'Text too long',
      code: ErrorCodes.VALIDATION_ERROR,
      timestamp: new Date().toISOString()
    });
    return;
  }

  next();
};

export const validateParseRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { resumeText } = req.body;
  
  if (!resumeText?.trim()) {
    res.status(400).json({
      error: 'Resume text is required',
      code: ErrorCodes.VALIDATION_ERROR,
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (resumeText.length > MAX_TEXT_LENGTH) {
    res.status(400).json({
      error: 'Text too long',
      code: ErrorCodes.VALIDATION_ERROR,
      timestamp: new Date().toISOString()
    });
    return;
  }

  next();
};