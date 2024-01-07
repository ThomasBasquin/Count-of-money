import express from 'express';
import { isAuth, isNotAuth } from '../middleware/authMiddleware.js';
import passport from "../config/passport.js"
import session from 'express-session';

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

/**
 * @swagger
 * /google:
 *   get:
 *     summary: Google Authentication
 *     description: Redirects the user to the Google authentication screen.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirect to the Google authentication screen.
 *       401:
 *         description: User is not authenticated.
 *     deprecated: false
 */

router.get(
  '/auth/google',
  isNotAuth,
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

/**
 * @swagger
 * /google/callback:
 *   get:
 *     summary: Google Authentication Callback
 *     description: Handles the callback from Google authentication after the user has granted access.
 *     tags:
 *       - Authentication
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
  isNotAuth, function (req, res, next) {
    passport.authenticate('google', function (err, user) {
      req.session.user = user
      req.session.save()
      console.log(req.session.user)
      next()
    })(req, res, next);
  },
  (req, res) => {
    res.redirect('http://localhost:3001/dashboard');
  }
);

// Logout route
router.get('/oauth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
