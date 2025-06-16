import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  toggleTask,
  updateTask,
} from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { wrapAsync } from '../utils/wrapAsync';

const router = Router();
router.use(wrapAsync(authMiddleware));

router.get('/', getAllTasks);
router.post('/', wrapAsync(createTask));
router.get('/:id', wrapAsync(getTaskById));
router.put('/:id', wrapAsync(updateTask));
router.delete('/:id', wrapAsync(deleteTask));
router.patch('/:id/toggle', wrapAsync(toggleTask));

export default router;
