import { Router } from 'express';
import { register , verifyEmail ,login } from '../controllers/auth.controller.js';
import { hashPassword } from '../middlewares/hashPassword.middleware.js';
import { handleValidationErrors, registerValidationRules , loginValidationRules } from '../validators/auth.validator.js';

const authRouter = Router();

authRouter.post('/register', registerValidationRules, handleValidationErrors, hashPassword, register);
authRouter.post('/login', loginValidationRules, handleValidationErrors, login);

authRouter.get('/verify-email', verifyEmail); 

export default authRouter;