import { createClient } from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

let redisClient = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
  },
});

const RedisStore = new connectRedis({
  client: redisClient,
});

redisClient.on('connect', () => {
  console.log('Connecté à Redis avec succès!');
});

redisClient.on('error', err => {
  console.error('Erreur de client Redis', err);
});

await redisClient.connect();

export { redisClient, RedisStore };
