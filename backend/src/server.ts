import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { coverLetterRoutes } from './routes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://cover-letter-generator-frontend.onrender.com']
    : ['http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

// Increase timeout limits
const server = app.listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

// Set keep-alive timeout to 120 seconds (120000 ms)
server.keepAliveTimeout = 120000;
// Set headers timeout to 120 seconds (120000 ms)
server.headersTimeout = 120000;

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api', coverLetterRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;