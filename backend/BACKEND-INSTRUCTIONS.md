# Backend Documentation: Cover Letter Generator

## Architecture Overview

### Directory Structure
```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── types/           # TypeScript types
│   ├── utils/           # Helper functions
│   └── config/          # Configuration files
├── tests/               # Test files
└── docs/               # Additional documentation
```

## Core Components

### 1. API Routes

#### Cover Letter Routes
- **Endpoint**: `/api/cover-letter`
- **Methods**: 
  - POST `/generate` - Generate cover letter
  - POST `/analyze` - Analyze job description
  - POST `/parse-resume` - Parse resume content

#### User Routes (Future)
- **Endpoint**: `/api/user`
- **Methods**:
  - POST `/save` - Save generated letter
  - GET `/history` - Get generation history

### 2. Controllers

#### Generator Controller
- Handles cover letter generation requests
- Manages input validation
- Coordinates between services
- Returns formatted responses

#### Parser Controller
- Handles document parsing
- Extracts relevant information
- Validates input formats

### 3. Services

#### OpenAI Service
- Manages OpenAI API interactions
- Handles prompt engineering
- Processes API responses
- Implements retry logic

#### Parser Service
- Resume parsing logic
- Job description analysis
- Text extraction from various formats
- Key information identification

### 4. Middleware

#### Validation Middleware
- Input validation
- Schema verification
- File type checking
- Size limit enforcement

#### Error Middleware
- Error catching
- Error formatting
- Response standardization
- Logging

## API Specifications

### 1. Generate Cover Letter
```typescript
POST /api/cover-letter/generate

Request:
{
  jobDescription: string;
  resumeText: string;
  preferences?: {
    tone: 'professional' | 'casual' | 'enthusiastic';
    length: 'short' | 'medium' | 'long';
    focus: string[];
  }
}

Response:
{
  coverLetter: string;
  metadata: {
    matchScore: number;
    keywordMatches: string[];
    generationTime: number;
  }
}

Error Response:
{
  error: string;
  code: number;
  details?: any;
}
```

### 2. Analyze Job Description
```typescript
POST /api/cover-letter/analyze

Request:
{
  jobDescription: string;
}

Response:
{
  keyRequirements: string[];
  suggestedSkills: string[];
  companyCulture: string;
  jobLevel: string;
}X
```

### 3. Parse Resume
```typescript
POST /api/cover-letter/parse-resume

Request:
{
  resumeText: string;
  fileType?: string;
}

Response:
{
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
```

## Error Handling

### Error Codes
```typescript
enum ErrorCodes {
  VALIDATION_ERROR = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  RATE_LIMIT_EXCEEDED = 429,
  INTERNAL_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}
```

### Error Responses
```typescript
interface ErrorResponse {
  error: string;
  code: ErrorCodes;
  details?: any;
  timestamp: string;
  requestId: string;
}
```

## Rate Limiting

### Limits
- 10 generations per hour per IP
- 50 generations per day per IP
- 100 analysis requests per day
- 5MB max file size for uploads

### Headers
```
X-RateLimit-Limit: [limit]
X-RateLimit-Remaining: [remaining]
X-RateLimit-Reset: [reset timestamp]
```

## Security Measures

### Input Validation
- Sanitize all text inputs
- Validate file types
- Check file sizes
- Verify content types

### API Security
- CORS configuration
- Rate limiting
- Request size limits
- Input sanitization

## Monitoring

### Health Metrics
- API response times
- Error rates
- Service availability
- Resource usage

### Business Metrics
- Generations per hour
- Success rate
- Average generation time
- User retention

## Environment Variables
```env
# Server Configuration
PORT=3000
NODE_ENV=development
API_VERSION=v1

# OpenAI Configuration
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-3.5-turbo
MAX_TOKENS=1000

# Rate Limiting
RATE_LIMIT_WINDOW=3600
RATE_LIMIT_MAX=10

# Security
CORS_ORIGIN=http://localhost:5173
MAX_REQUEST_SIZE=5mb
```

## Testing Strategy

### Unit Tests
- Controller logic
- Service functions
- Middleware behavior
- Utility functions

### Integration Tests
- API endpoints
- Service interactions
- Error handling
- Rate limiting

### Performance Tests
- Response times
- Concurrent requests
- Rate limit behavior
- Resource usage

## Deployment Considerations

### Prerequisites
- Node.js 18+
- TypeScript 5+
- OpenAI API access
- MongoDB (optional)

### Configuration
- Environment variables
- CORS settings
- Rate limit configs
- Logging setup

### Monitoring Setup
- Health checks
- Error tracking
- Performance monitoring
- Usage analytics