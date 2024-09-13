import { Router } from 'express';
import { validate } from '../../utils/validate-middleware';
import { isAuthenticated } from '../../utils/auth/authenticated.middleware';
import { TodoAddDTO } from './todo.dto';
import { add, checkCompleted, list, uncheckCompleted } from './todo.controller';

const router = Router();

router.use(isAuthenticated);
router.post('/', validate(TodoAddDTO, 'body'), add);
router.get('/', list);
router.patch('/:id/check', checkCompleted)
router.patch('/:id/uncheck', uncheckCompleted)

export default router;