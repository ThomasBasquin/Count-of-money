import express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import dotenv from 'dotenv';
import { redisClient, RedisStore } from './config/redis.js';
import connectDB from './config/mongo.js';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swaggerConfig.js';

const app = express();
dotenv.config();

console.log(process.env.SESSION_SECRET);

await connectDB().catch(err => {
  console.error(err);
  process.exit(1);
});

app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false }));
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
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
app.use('/api', routes);

export default app;
