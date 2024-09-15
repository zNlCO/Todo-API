import { Router } from "express";
import { me, fetch } from "./user.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";


const router = Router();

router.get('/me', isAuthenticated, me);
router.get('/fetch', isAuthenticated, fetch);   

export default router;
