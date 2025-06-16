import rateLimit from 'express-rate-limit';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Máximo 10 intentos por IP
  message: {
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true, // Devuelve los headers estándar RateLimit
  legacyHeaders: false, // Desactiva X-RateLimit-* headers antiguos
});
