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
 *     description: Retrieves the price history of a specific cryptocurrency based on its ID and a specified period.
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
 *       - name: period
 *         in: path
 *         description: Time period for the price history (e.g., 'daily', 'weekly', 'monthly').
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of cryptocurrency price history.
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

/**
 * @swagger
 * /cryptos:
 *   post:
 *     summary: Add a New Cryptocurrency
 *     description: Adds a new cryptocurrency to the system.
 *     tags:
 *       - Cryptos
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       description: Data for the new cryptocurrency.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the cryptocurrency.
 *               symbol:
 *                 type: string
 *                 description: The symbol of the cryptocurrency.

 *
 *     responses:
 *       201:
 *         description: Cryptocurrency added successfully.
 *       401:
 *         description: User is not authenticated.
 *       403:
 *         description: User does not have the necessary permissions (admin role).
 *       422:
 *         description: Validation error. Check the request body for missing or invalid fields.
 *       500:
 *         description: Internal server error.
 *     deprecated: false
 */

router.post('/', isAuth, validateCrypto, cryptoController.addCrypto);

/**
 * @swagger
 * /cryptos/{cmid}:
 *   delete:
 *     summary: Delete a Cryptocurrency
 *     description: Deletes a cryptocurrency based on its ID.
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
 *       204:
 *         description: Cryptocurrency deleted successfully.
 *       401:
 *         description: User is not authenticated.
 *       403:
 *         description: User does not have the necessary permissions (admin role).
 *       404:
 *         description: The specified cryptocurrency was not found.
 *       500:
 *         description: Internal server error.
 *     deprecated: false
 */

router.delete('/:cmid', isAuth, cryptoController.deleteCrypto);

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
