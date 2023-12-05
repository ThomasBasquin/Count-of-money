import express from 'express';
import articleController from '../controllers/articleController.js';
import { isAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get List of Articles
 *     description: Retrieves a list of articles.
 *     tags:
 *       - Articles
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: params1
 *         in: query
 *         description: Query parameters for filtering articles.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of the list of articles.
 *       401:
 *         description: User is not authenticated.
 *       500:
 *         description: Internal server error.
 *     deprecated: false
 */

router.get('/articles', isAuth, articleController.getArticles);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get Details of an Article
 *     description: Retrieves details of an article based on its ID.
 *     tags:
 *       - Articles
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Article ID.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of article details.
 *       401:
 *         description: User is not authenticated.
 *       404:
 *         description: The specified article was not found.
 *       500:
 *         description: Internal server error.
 *     deprecated: false
 */

router.get('/articles/:id', isAuth, articleController.getArticleById);

export default router;
