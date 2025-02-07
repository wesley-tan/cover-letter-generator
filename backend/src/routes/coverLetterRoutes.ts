import express, { Router } from 'express';
import { 
  validateGenerateRequest, 
  validateAnalyzeRequest, 
  validateParseRequest 
} from '../middleware/validationMiddleware';
import { 
  generateCoverLetter,
  analyzeJob,
  parseResume 
} from '../controllers/coverLetterController';

const router: Router = express.Router();

// Generate cover letter route
router.post('/cover-letter/generate', validateGenerateRequest as any, generateCoverLetter as any);

// Analyze job description route
router.post('/analyze', validateAnalyzeRequest as any, analyzeJob as any);

// Parse resume route
router.post('/parse-resume', validateParseRequest as any, parseResume as any);

export default router;