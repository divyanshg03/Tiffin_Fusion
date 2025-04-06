import express from 'express';
import { registerUser, loginUser } from '../controller/user.controller.js';
import { checkAdmin } from '../middleware/chekAdmin.midddleware.js';
const authRouter = express.Router();

// Register Route
authRouter.post('/signup', registerUser);

// Login Route
authRouter.post('/login', loginUser);

authRouter.post('/check-admin' ,loginUser)

export {authRouter}
