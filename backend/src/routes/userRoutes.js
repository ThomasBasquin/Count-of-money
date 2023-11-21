import express from 'express';
import userController from '../controllers/userController.js';
import { isAuth, isNotAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', isNotAuth, userController.register);

router.post('/login', isNotAuth, userController.login);

router.get('/profile', isAuth, userController.getProfile);

router.put('/profile', isAuth, userController.updateProfile);

router.post('/logout', isAuth, userController.logout);

export default router;
