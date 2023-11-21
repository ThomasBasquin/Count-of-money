import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const RedisStore = connectRedis(session);
const redisClient = createClient({
  socket: {
    host: 'redis',
    port: '6379',
  },
});

redisClient.on('error', err => console.error('Redis Client Error', err));
await redisClient.connect();

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Nombre de visites : ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Bienvenue pour votre première visite !');
  }
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
