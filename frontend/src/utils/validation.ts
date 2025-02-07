export interface ValidationErrors {
  jobDescription?: string;
  resumeText?: string;
}

export const validateForm = (jobDescription: string, resumeText: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!jobDescription.trim()) {
    errors.jobDescription = 'Job description is required';
  } else if (jobDescription.length < 50) {
    errors.jobDescription = 'Job description should be at least 50 characters';
  }

  if (!resumeText.trim()) {
    errors.resumeText = 'Resume is required';
  } else if (resumeText.length < 100) {
    errors.resumeText = 'Resume should be at least 100 characters';
  }

  return errors;
}; 