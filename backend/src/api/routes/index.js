import express from 'express';
// import userRoutes from './userRoutes.js';

const router = express.Router();

// router.use('/users', userRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur notre API!' });
});

export default router;
