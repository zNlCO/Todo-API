import { Router } from 'express';
import { add, list } from './todo/todo.controller';

const router = Router();

router.post('/todos/', add);
router.get('/todos/', list);

export default router;