import { Router } from 'express';
import { register } from '../controllers/auth.controller.js';
import { hashPassword } from '../middlewares/hashPassword.middleware.js';
import { handleValidationErrors, registerValidationRules } from '../validators/auth.validator.js';

const authRouter = Router();

authRouter.post('/register', registerValidationRules, handleValidationErrors, hashPassword, register);

export default authRouter;