import express from 'express'
import { signup, login, logout ,authCheck} from '../controllers/auth.controller.js'; // Import the auth controller
import User from '../models/user.js'; // Import the User model
import { protectRoutes } from '../middleware/protectRoutes.js';
const router=express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.get('/authCheck',protectRoutes,authCheck);

export default router;