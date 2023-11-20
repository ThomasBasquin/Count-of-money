const express = require('express');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = require('redis').createClient();
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  session({
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
