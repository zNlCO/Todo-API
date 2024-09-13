import { Router } from "express";
import { validate } from "../../utils/validate-middleware";
import { AddUserDTO } from "./auth.dto";
import { add } from "./auth.controller";


const router = Router();

router.post('/register', validate(AddUserDTO, 'body'), add);

export default router;
