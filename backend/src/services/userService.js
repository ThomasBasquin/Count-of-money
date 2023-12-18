import User from '../models/user.model.js';
import Crypto from '../models/crypto.model.js';
import bcrypt from 'bcryptjs';

const userService = {
  create: async ({ username, email, password }) => {
    const sameEmail = await User.findOne({ email });
    const sameUsername = await User.findOne({ username });

    if (sameEmail || sameUsername) {
      throw new Error('Un utilisateur existe déjà avec ces informations.');
    }

    const user = new User({ username, email, password });
    await user.save();
    return user;
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Aucun utilisateur trouvé avec cet email.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Mot de passe incorrect.');
    }

    return user;
  },

  getProfile: async userId => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Aucun utilisateur trouvé.');
    }
    return user;
  },

  updateProfile: async (userId, updateData) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Aucun utilisateur trouvé.');
    }

    if (updateData.username) {
      user.username = updateData.username;
    }
    if (updateData.defaultCurrency) {
      user.defaultCurrency = updateData.defaultCurrency;
    }
    if (updateData.pressReviewKeywords)
      user.pressReviewKeywords = updateData.pressReviewKeywords;

    await user.save();
    return user;
  },

  addFavorite: async (userId, cryptoId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Aucun utilisateur trouvé.');
    }

    const crypto = await Crypto.findOne({ cmid: cryptoId });
    if (!crypto) {
      throw new Error('Aucune crypto trouvée.');
    }

    const cryptoIndex = user.cryptoCurrencies.indexOf(crypto._id);

    if (cryptoIndex !== -1) {
      throw new Error('Cette crypto est déjà dans vos favoris.');
    }

    user.cryptoCurrencies.push(crypto._id);

    await user.save();
    return user;
  },

  removeFavorite: async (userId, cryptoId) => {
    const user = await User.findById(userId);
    const crypto = await Crypto.findOne({ cmid: cryptoId });

    if (!user) {
      throw new Error('Aucun utilisateur trouvé.');
    }

    if (!crypto) {
      throw new Error('Crypto-monnaie non trouvée.');
    }

    const cryptoIndex = user.cryptoCurrencies.findIndex(
      id => id.toString() === crypto._id.toString()
    );

    if (cryptoIndex === -1) {
      throw new Error("Cette crypto n'est pas dans vos favoris.");
    }

    user.cryptoCurrencies.splice(cryptoIndex, 1);

    await user.save();
    return user;
  },

  getFavorites: async userId => {
    const user = await User.findById(userId).populate('cryptoCurrencies');

    if (!user) {
      throw new Error('Aucun utilisateur trouvé.');
    }

    return user;
  },
};

export default userService;
