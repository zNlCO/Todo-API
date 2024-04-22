import { Router } from 'express';
import { add, checkCompleted, list, uncheckCompleted } from './todo/todo.controller';

const router = Router();

router.post('/todos/', add);
router.get('/todos/', list);
router.patch('/todos/:id/check', checkCompleted)
router.patch('/todos/:id/uncheck', uncheckCompleted)

export default router;