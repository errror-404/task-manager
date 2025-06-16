import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { authRateLimiter } from '../middleware/rateLimit.middleware';
import { wrapAsync } from '../utils/wrapAsync';
const router = Router();

router.post('/register', authRateLimiter, wrapAsync(register));
router.post('/login', authRateLimiter, wrapAsync(login));

export default router;
