import express from 'express';
import cryptoController from '../controllers/cryptoController.js';
import validateCrypto from '../middleware/cryptoJoi.js';
import { isAuth, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 *
 * @swagger
 * /cryptos:
 *   get:
 *     summary: Get the list of cryptocurrencies and their info
 *     tags: [Cryptocurrencies]
 *     parameters:
 *       - in: query
 *         name: cmids
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional comma-separated cryptocurrency IDs to filter the list
 *     responses:
 *       200:
 *         description: A list of cryptocurrencies and their information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cmid:
 *                     type: string
 *                     description: The unique identifier for the cryptocurrency
 *                   name:
 *                     type: string
 *                     description: Full name of the cryptocurrency
 *                   currentPrice:
 *                     type: number
 *                     format: float
 *                     description: Current price of the cryptocurrency
 *                   openingPrice:
 *                     type: number
 *                     format: float
 *                     description: Opening price of the cryptocurrency
 *                   lowestPriceOfDay:
 *                     type: number
 *                     format: float
 *                     description: Lowest price of the day for the cryptocurrency
 *                   highestPriceOfDay:
 *                     type: number
 *                     format: float
 *                     description: Highest price of the day for the cryptocurrency
 *                   imageUrl:
 *                     type: string
 *                     description: URL of the corresponding image of the cryptocurrency
 *       400:
 *         description: Bad request if the cmids query parameter is not formatted correctly
 */

router.get('/cryptos', cryptoController.getList);

// GET les informations détaillées d'une crypto-monnaie spécifique
router.get('/cryptos/:cmid', isAuth, cryptoController.getDetails);

// GET l'historique des prix d'une crypto-monnaie pour une période donnée
router.get(
  '/cryptos/:cmid/history/:period',
  isAuth,
  cryptoController.getPriceHistory
);

// POST pour ajouter une nouvelle crypto-monnaie (seulement admin)
router.post(
  '/cryptos',
  isAuth,
  isAdmin,
  validateCrypto,
  cryptoController.addCrypto
);

// DELETE pour supprimer une crypto-monnaie (seulement admin)
router.delete('/cryptos/:cmid', isAuth, isAdmin, cryptoController.deleteCrypto);

export default router;
