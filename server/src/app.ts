import cors from 'cors';
import express, { Application } from 'express';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

const app: Application = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // o tu frontend real en producción
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

export default app;
