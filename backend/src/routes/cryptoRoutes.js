import express from 'express';
import cryptoController from '../controllers/cryptoController.js';
import validateCrypto from '../middleware/cryptoJoi.js';
import { isAuth, isNotAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /cryptos/{cmid}/history/{period}:
 *   get:
 *     summary: Get Price History of a Specific Cryptocurrency
 *     description: Retrieves the price history of a specific cryptocurrency based on its ID for a specified period. The periods can be 'daily' (last 90 days), 'hourly' (last 48 hours), or 'minute' (last 2 hours).
 *     tags:
 *       - Cryptos
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: cmid
 *         in: path
 *         description: Cryptocurrency ID (e.g., 'bitcoin').
 *         required: true
 *         schema:
 *           type: string
 *       - name: period
 *         in: path
 *         description: Time period for the price history. Valid periods are 'daily', 'hourly', or 'minute'.
 *         required: true
 *         schema:
 *           type: string
 *           enum: [daily, hourly, minute]
 *     responses:
 *       200:
 *         description: Successful retrieval of cryptocurrency price history, including opening, highest, lowest, and closing prices for the specified period.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 opening:
 *                   type: number
 *                   description: Opening price for the period.
 *                 highest:
 *                   type: number
 *                   description: Highest price during the period.
 *                 lowest:
 *                   type: number
 *                   description: Lowest price during the period.
 *                 closing:
 *                   type: number
 *                   description: Closing price for the period.
 *       401:
 *         description: User is not authenticated.
 *       404:
 *         description: The specified cryptocurrency or period was not found.
 *       500:
 *         description: Internal server error.
 *     deprecated: false
 */

router.get('/:cmid/history/:period', isAuth, cryptoController.getCryptoHistory);

/**
 * @swagger
 * /cryptos/{cmid}:
 *   get:
 *     summary: Get Details of a Specific Cryptocurrency
 *     description: Retrieves details of a cryptocurrency based on its ID.
 *     tags:
 *       - Cryptos
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: cmid
 *         in: path
 *         description: Cryptocurrency ID.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of cryptocurrency details.
 *       401:
 *         description: User is not authenticated.
 *       404:
 *         description: The specified cryptocurrency was not found.
 *       500:
 *         description: Internal server error.
 *     deprecated: false
 */

router.get('/:cmid', isAuth, cryptoController.getCryptoById);

/**
 * @swagger
 * /cryptos:
 *   get:
 *     summary: Get List of Cryptocurrencies
 *     description: Retrieves a list of cryptocurrencies.
 *     tags:
 *       - Cryptos
 *     responses:
 *       200:
 *         description: Successful retrieval of the list of cryptocurrencies.
 *       500:
 *         description: Internal server error.
 *     deprecated: false
 */

router.get('/', cryptoController.getList);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Crypto:
 *       type: object
 *       required:
 *         - cmid
 *         - name
 *         - currentPrice
 *         - openingPrice
 *         - lowestPriceOfDay
 *         - highestPriceOfDay
 *         - imageUrl
 *       properties:
 *         cmid:
 *           type: string
 *           description: Unique identifier for the cryptocurrency
 *         name:
 *           type: string
 *           description: Full name of the cryptocurrency
 *         currentPrice:
 *           type: number
 *           format: float
 *           description: Current price of the cryptocurrency
 *         openingPrice:
 *           type: number
 *           format: float
 *           description: Opening price of the cryptocurrency
 *         lowestPriceOfDay:
 *           type: number
 *           format: float
 *           description: Lowest price of the day for the cryptocurrency
 *         highestPriceOfDay:
 *           type: number
 *           format: float
 *           description: Highest price of the day for the cryptocurrency
 *         imageUrl:
 *           type: string
 *           description: URL of the corresponding image of the cryptocurrency
 *       example:
 *         cmid: bitcoin
 *         name: Bitcoin
 *         currentPrice: 50000
 *         openingPrice: 49500
 *         lowestPriceOfDay: 48000
 *         highestPriceOfDay: 51000
 *         imageUrl: 'http://example.com/bitcoin.jpg'
 */
