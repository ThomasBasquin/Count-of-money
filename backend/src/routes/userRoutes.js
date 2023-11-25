import express from 'express';
import userController from '../controllers/userController.js';
import validateUser from '../middleware/userJoi.js';
import { isAuth, isNotAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *                 trim: true
 *                 lowercase: true
 *                 minLength: 3
 *                 maxLength: 30
 *                 description: Unique and trimmed username in lowercase
 *               email:
 *                 type: string
 *                 required: true
 *                 trim: true
 *                 lowercase: true
 *                 description: Unique and valid email address in lowercase
 *               password:
 *                 type: string
 *                 required: true
 *                 minLength: 6
 *                 description: Strong password with a minimum of six characters
 *               defaultCurrency:
 *                 type: string
 *                 enum: ['USD', 'EUR', 'GBP', 'JPY']
 *                 default: 'EUR'
 *                 description: Default currency for the user
 *               cryptoCurrencies:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Array of IDs of crypto currencies
 *               pressReviewKeywords:
 *                 type: array
 *                 items:
 *                   type: string
 *                   trim: true
 *                   description: Array of keywords for the press review
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the user
 *                 username:
 *                   type: string
 *                   description: The user's unique username
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user's email address
 *                 defaultCurrency:
 *                   type: string
 *                   description: The user's default currency for cryptocurrency prices
 *                 cryptoCurrencies:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of IDs of the user's chosen cryptocurrencies
 *                 pressReviewKeywords:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of the user's chosen keywords for their press review
 *       400:
 *         description: Input validation failed
 *       409:
 *         description: Username or email already exists
 */

router.post('/register', isNotAuth, validateUser, userController.register);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 trim: true
 *                 lowercase: true
 *                 description: Valid email address in lowercase
 *               password:
 *                 type: string
 *                 required: true
 *                 description: Password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the user
 *                 username:
 *                   type: string
 *                   description: The user's unique username
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user's email address
 *                 defaultCurrency:
 *                   type: string
 *                   description: The user's default currency for cryptocurrency prices
 *                 cryptoCurrencies:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of IDs of the user's chosen cryptocurrencies
 *                 pressReviewKeywords:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of the user's chosen keywords for their press review
 *       400:
 *         description: Input validation failed
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.post('/login', isNotAuth, userController.login);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Retrieve the profile of the logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Assumes you have already defined the security scheme 'bearerAuth'
 *     responses:
 *       200:
 *         description: Profile information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the user
 *                 username:
 *                   type: string
 *                   description: The user's unique username
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user's email address
 *                 defaultCurrency:
 *                   type: string
 *                   description: The user's default currency for cryptocurrency prices
 *                 cryptoCurrencies:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of IDs of the user's chosen cryptocurrencies
 *                 pressReviewKeywords:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of the user's chosen keywords for their press review
 *       401:
 *         description: Unauthorized - token not provided or invalid
 *       500:
 *         description: Internal server error
 */

router.get('/profile', isAuth, userController.getProfile);

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user's profile information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Assumes you have already defined the security scheme 'bearerAuth'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's unique username
 *                 minLength: 3
 *                 maxLength: 30
 *               defaultCurrency:
 *                 type: string
 *                 description: The user's default currency for cryptocurrency prices
 *                 enum: ['USD', 'EUR', 'GBP', 'JPY']
 *               cryptoCurrencies:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Array of IDs of crypto currencies to display on the user's homepage
 *               pressReviewKeywords:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Array of keywords for the user's press review
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the user
 *                 username:
 *                   type: string
 *                   description: The user's updated username
 *                 defaultCurrency:
 *                   type: string
 *                   description: The user's updated default currency for cryptocurrency prices
 *                 cryptoCurrencies:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Updated array of IDs of crypto currencies for the user's homepage
 *                 pressReviewKeywords:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Updated array of keywords for the user's press review
 *       400:
 *         description: Validation error - input does not match the required format
 *       401:
 *         description: Unauthorized - token not provided or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.put('/profile', isAuth, validateUser, userController.updateProfile);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Log out the current user and destroy the session
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []  # Assumes you have defined the security scheme 'cookieAuth' for the session cookie
 *     responses:
 *       200:
 *         description: User logged out successfully and session destroyed
 *       401:
 *         description: Unauthorized - No session to destroy
 */

router.post('/logout', isAuth, userController.logout);

export default router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *    cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: connect.sid
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Unique and trimmed username in lowercase
 *         email:
 *           type: string
 *           description: Unique and valid email address in lowercase
 *         password:
 *           type: string
 *           format: password
 *           description: Strong password with a minimum of six characters
 *         defaultCurrency:
 *           type: string
 *           enum: ['USD', 'EUR', 'GBP', 'JPY']
 *           description: Default currency for the user
 *         cryptoCurrencies:
 *           type: array
 *           items:
 *             type: string
 *             description: Array of IDs of crypto currencies
 *         pressReviewKeywords:
 *           type: array
 *           items:
 *             type: string
 *             description: Array of keywords for the press review
 *       example:
 *         username: user123
 *         email: user@example.com
 *         password: password123
 *         defaultCurrency: 'EUR'
 *         cryptoCurrencies: ['60b...','60c...']
 *         pressReviewKeywords: ['bitcoin', 'ethereum']
 */
