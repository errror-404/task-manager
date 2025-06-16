import cors from 'cors';
import express, { Application } from 'express';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';
import columnRoutes from './routes/column.routes';
import taskRoutes from './routes/task.routes';

const app: Application = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/columns', columnRoutes);

app.use(errorHandler);

export default app;
