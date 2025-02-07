import { Request, Response } from 'express';

export const parseResume = async (req: Request, res: Response) => {
  try {
    // TODO: Implement resume parsing logic
    res.status(200).json({ message: 'Resume parsing endpoint' });
  } catch (error) {
    res.status(500).json({ message: 'Error parsing resume' });
  }
}; 