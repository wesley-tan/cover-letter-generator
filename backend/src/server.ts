import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { coverLetterRoutes } from './routes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://cover-letter-generator-frontend.onrender.com',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// For Render deployment
const PORT = Number(process.env.PORT) || 10000;

// Start server
const startServer = async () => {
  try {
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Server address: http://0.0.0.0:${PORT}`);
    });

    // Set keep-alive timeout to 120 seconds
    server.keepAliveTimeout = 120000;
    server.headersTimeout = 120000;

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api', coverLetterRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

startServer();

export default app;