import User from '../models/user.model.js';
import dotenv from 'dotenv';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        }
        const newUser = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Serialize and deserialize user data for session management
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
