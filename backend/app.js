import express from 'express';
import session from 'express-session';
import { createClient } from 'redis';
import dotenv from 'dotenv';
import RedisStore from 'connect-redis';
import helmet from 'helmet';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
let redisClient = createClient({
  socket: {
    host: 'redis',
    port: 6379,
  },
});

redisClient.on('connect', () => {
  console.log('Connecté à Redis avec succès!');
});

redisClient.on('error', err => {
  console.error('Erreur de client Redis', err);
});

await redisClient.connect();

let redisStore = new RedisStore({
  client: redisClient,
});

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
  session({
    store: redisStore,
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
