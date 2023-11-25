import express from 'express';
import { isAuth, isNotAuth } from '../middleware/authMiddleware.js';
import passport from 'passport';

const router = express.Router();

router.get(
  '/google',
  isNotAuth,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  isNotAuth,
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

export default router;
