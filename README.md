# Cover Letter Generator

An AI-powered application that generates personalized cover letters by analyzing job descriptions and resumes. Built with React, Node.js, and OpenAI.

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Shadcn UI components
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- OpenAI API integration
- Rate limiting
- CORS security

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cover-letter-generator
```

2. Install dependencies
```bash
# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

3. Environment Setup

Create `.env` files in both frontend and backend directories:

Frontend `.env`:
```env
VITE_API_URL=http://localhost:3001/api
```

Backend `.env`:
```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Development

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Project Structure

### Frontend
```
frontend/
├── src/
│   ├── components/    # UI components
│   ├── services/      # API services
│   ├── hooks/         # Custom hooks
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
```

### Backend
```
backend/
├── src/
│   ├── controllers/   # Request handlers
│   ├── services/      # Business logic
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   └── config/        # Configuration
```

## API Endpoints

### Cover Letter Generation
```
POST /api/cover-letter/generate
Content-Type: application/json

{
  "jobDescription": string,
  "resumeText": string,
  "preferences": {
    "tone": string,
    "length": string
  }
}
```

## Testing

Run frontend tests:
```bash
cd frontend
npm test
```

Run backend tests:
```bash
cd backend
npm test
```
