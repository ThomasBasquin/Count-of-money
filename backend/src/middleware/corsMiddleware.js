import express from 'express';
import cors from 'cors';

const corsMiddleware = express();

corsMiddleware.use(
  cors({ origin: 'http://localhost:3000', credentials: true })
);

export default corsMiddleware;
