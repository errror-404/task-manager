import { Router } from 'express';
import {
  createColumn,
  deleteColumn,
  getAllColumns,
  reorderColumns,
  updateColumn,
} from '../controllers/column.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { wrapAsync } from '../utils/wrapAsync';

const router = Router();

router.use(wrapAsync(authMiddleware));

router.get('/', wrapAsync(getAllColumns));
router.post('/', wrapAsync(createColumn));
router.put('/:id', wrapAsync(updateColumn));
router.delete('/:id', wrapAsync(deleteColumn));
router.patch('/reorder', wrapAsync(reorderColumns));

export default router;
