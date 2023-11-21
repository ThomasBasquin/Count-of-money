import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { redisClient, RedisStore } from './config/redis.js';
import connectDB from './config/mongo.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

await connectDB().catch(err => {
  console.error(err);
  process.exit(1);
});

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
  session({
    store: RedisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
