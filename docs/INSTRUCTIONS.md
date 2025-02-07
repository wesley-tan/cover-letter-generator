# Cover Letter Generator Development Guide

## 1. Project Setup

### 1.1 Initialize Git Repository
```bash
# Create project directory
mkdir cover-letter-generator
cd cover-letter-generator

# Initialize Git
git init
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore
echo ".env" >> .gitignore

# Create main project structure
mkdir frontend backend
```

### 1.2 Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Create Vite project
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install
npm install axios @radix-ui/react-alert @radix-ui/react-slot
npm install class-variance-authority clsx lucide-react
npm install tailwindcss postcss autoprefixer
npm install -D @types/node

# Initialize Tailwind
npx tailwindcss init -p

# Add shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card textarea alert
```

### 1.3 Backend Setup
```bash
# Navigate to backend directory
cd ../backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors dotenv openai
npm install -D typescript @types/node @types/express @types/cors
npm install -D nodemon ts-node

# Initialize TypeScript
npx tsc --init
```

## 2. Project Structure

### 2.1 Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── TextArea.tsx
│   │   │   └── Alert.tsx
│   │   ├── CoverLetter/
│   │   │   ├── Generator.tsx
│   │   │   ├── Preview.tsx
│   │   │   └── Form.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── services/
│   │   └── api.ts
│   ├── hooks/
│   │   └── useGenerator.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── validation.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── tsconfig.json
```

### 2.2 Backend Structure
```
backend/
├── src/
│   ├── controllers/
│   │   └── generator.controller.ts
│   ├── services/
│   │   ├── openai.service.ts
│   │   └── parser.service.ts
│   ├── routes/
│   │   └── api.routes.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── types/
│   │   └── index.ts
│   └── server.ts
├── package.json
└── tsconfig.json
```

## 3. Configuration Files

### 3.1 Frontend Config Files

#### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 3.2 Backend Config Files

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

#### .env
```env
PORT=3000
OPENAI_API_KEY=your_key_here
NODE_ENV=development
```

## 4. Implementation Steps

### 4.1 Frontend Implementation
1. Set up base components
2. Implement form handling
3. Create API service
4. Add error handling
5. Implement loading states
6. Add validation
7. Create preview component
8. Add copy/download functionality

### 4.2 Backend Implementation
1. Set up Express server
2. Create API routes
3. Implement OpenAI service
4. Add input validation
5. Implement error handling
6. Add rate limiting
7. Set up logging
8. Implement file handling

## 5. Testing Setup

### 5.1 Frontend Testing
```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### 5.2 Backend Testing
```bash
# Install testing dependencies
npm install -D jest @types/jest supertest @types/supertest
```

## 6. CI/CD Setup

### 6.1 GitHub Actions Workflow
```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18.x'
      - name: Install Dependencies
        run: |
          cd frontend && npm install
          cd ../backend && npm install
      - name: Run Tests
        run: |
          cd frontend && npm test
          cd ../backend && npm test
```

## 7. Development Workflow

### 7.1 Starting Development
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

### 7.2 Git Workflow
```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push changes
git push origin feature/feature-name
```

## 8. Deployment

### 8.1 Frontend Deployment
```bash
# Build frontend
cd frontend
npm run build
```

### 8.2 Backend Deployment
```bash
# Build backend
cd backend
npm run build
```

## 9. Documentation

### 9.1 API Documentation
Create `api.md` in the backend directory:
```markdown
# API Documentation

## Endpoints

### POST /api/generate
Generates a cover letter based on job description and resume.

Request:
{
  "jobDescription": string,
  "resumeText": string
}

Response:
{
  "coverLetter": string
}
```

### 9.2 Developer Documentation
Create `CONTRIBUTING.md` in the root directory:
```markdown
# Contributing Guide

## Setup
1. Clone repository
2. Install dependencies
3. Set up environment variables
4. Start development servers

## Code Style
- Use TypeScript
- Follow ESLint rules
- Write unit tests
```