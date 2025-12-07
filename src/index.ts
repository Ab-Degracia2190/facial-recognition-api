import 'dotenv/config'
import express from 'express';
import router from './routes';
import { connectDB } from '@aldrin-degracia/facial-recognition-backend';
import cors from 'cors';

const app = express();
const port = Number(process.env.APP_PORT ?? 3000);

const corsOptions: cors.CorsOptions = {
  origin: process.env.APP_WEB_APP_URL ?? '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

async function startServer(): Promise<void> {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()

export default app;