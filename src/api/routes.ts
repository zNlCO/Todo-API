import { Router } from 'express';
import { add, list, setCompleted } from './todo/todo.controller';

const router = Router();

router.post('/todos/', add);
router.get('/todos/', list);
router.patch('/todos/:id', setCompleted)

export default router;