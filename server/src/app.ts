import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import taskRoutes from "./routes/task.routes";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Middleware de manejo de errores global
app.use(errorHandler);

export default app;
