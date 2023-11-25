import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur notre API!' });
});

export default router;
