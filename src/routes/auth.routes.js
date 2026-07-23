import { Router } from 'express';
import { register , verifyEmail ,login , getMe} from '../controllers/auth.controller.js';
import { hashPassword  } from '../middlewares/hashPassword.middleware.js';
import { handleValidationErrors, registerValidationRules , loginValidationRules } from '../validators/auth.validator.js';
import { authUser } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', registerValidationRules, handleValidationErrors, hashPassword, register);
authRouter.post('/login', loginValidationRules, handleValidationErrors, login);
authRouter.get("/get-me", authUser, getMe);

authRouter.get('/verify-email', verifyEmail); 

export default authRouter;