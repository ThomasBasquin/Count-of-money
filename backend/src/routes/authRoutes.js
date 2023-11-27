import express from 'express';
import { isAuth, isNotAuth } from '../middleware/authMiddleware.js';
import passport from 'passport';

const router = express.Router();

/**
 * @swagger
 * /google:
 *   get:
 *     summary: Google Authentication
 *     description: Redirects the user to the Google authentication screen.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       302:
 *         description: Redirect to the Google authentication screen.
 *       401:
 *         description: User is not authenticated.
 *     deprecated: false
 */

router.get(
  '/google',
  isNotAuth,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @swagger
 * /google/callback:
 *   get:
 *     summary: Google Authentication Callback
 *     description: Handles the callback from Google authentication after the user has granted access.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: code
 *         in: query
 *         description: Authorization code returned by Google after user authorization.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirect to the home page after successful authentication.
 *       401:
 *         description: Authentication failure, redirect to the login page.
 *       500:
 *         description: Internal server error.
 *     deprecated: false
 */

router.get(
  '/google/callback',
  isNotAuth,
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

export default router;
