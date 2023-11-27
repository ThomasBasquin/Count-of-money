import express from 'express';
import cryptoController from '../controllers/cryptoController.js';
import validateCrypto from '../middleware/cryptoJoi.js';
import { isAuth, isNotAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /cryptos:
 *   get:
 *     summary: Get List of Cryptocurrencies
 *     description: Retrieves a list of cryptocurrencies.
 *     tags:
 *       - Cryptos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful retrieval of the list of cryptocurrencies.
 *       500:
 *         description: Internal server error.
 *     deprecated: false
 */

router.get('/cryptos', cryptoController.getList);

/**
 * @swagger
 * /cryptos/{cmid}:
 *   get:
 *     summary: Get Details of a Specific Cryptocurrency
 *     description: Retrieves details of a cryptocurrency based on its ID.
 *     tags:
 *       - Cryptos
 *     security:
 *       - bearerAuth: []
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

router.get('/cryptos/:cmid', isAuth, cryptoController.getCryptoById);

/**
 * @swagger
 * /cryptos/{cmid}/history/{period}:
 *   get:
 *     summary: Get Price History of a Specific Cryptocurrency
 *     description: Retrieves the price history of a specific cryptocurrency based on its ID and a specified period.
 *     tags:
 *       - Cryptos
 *     security:
 *       - bearerAuth: []
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

router.get(
  '/cryptos/:cmid/history/:period',
  isAuth,
  cryptoController.getCryptoHistory
);

/**
 * @swagger
 * /cryptos:
 *   post:
 *     summary: Add a New Cryptocurrency
 *     description: Adds a new cryptocurrency to the system.
 *     tags:
 *       - Cryptos
 *     security:
 *       - bearerAuth: []
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

router.post('/cryptos', isAuth, validateCrypto, cryptoController.addCrypto);

/**
 * @swagger
 * /cryptos/{cmid}:
 *   delete:
 *     summary: Delete a Cryptocurrency
 *     description: Deletes a cryptocurrency based on its ID.
 *     tags:
 *       - Cryptos
 *     security:
 *       - bearerAuth: []
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

router.delete('/cryptos/:cmid', isAuth, cryptoController.deleteCrypto);

export default router;
