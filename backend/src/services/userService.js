import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const userService = {
  create: async ({ username, email, password }) => {
    const sameEmail = await User.findOne({ email });
    const sameUsername = await User.findOne({ username });

    if (sameEmail || sameUsername) {
      throw new Error('Un utilisateur existe déjà avec ces informations.');
    }

    if (password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
    }
    if (password.includes(' ')) {
      throw new Error("Le mot de passe ne doit pas contenir d'espace.");
    }
    if (username.length < 3) {
      throw new Error(
        "Le nom d'utilisateur doit contenir au moins 3 caractères."
      );
    }
    if (username.length > 15) {
      throw new Error(
        "Le nom d'utilisateur doit contenir au maximum 15 caractères."
      );
    }
    if (username.includes(' ')) {
      throw new Error("Le nom d'utilisateur ne doit pas contenir d'espace.");
    }

    const user = new User({ username, email, password });
    await user.save();
    return user;
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    console.log(user);
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
      if (updateData.username.length < 3) {
        throw new Error(
          "Le nom d'utilisateur doit contenir au moins 3 caractères."
        );
      }
      if (updateData.username.length > 15) {
        throw new Error(
          "Le nom d'utilisateur doit contenir au maximum 15 caractères."
        );
      }
      if (updateData.username.includes(' ')) {
        throw new Error("Le nom d'utilisateur ne doit pas contenir d'espace.");
      }
      user.username = updateData.username;
    }
    if (updateData.defaultCurrency) {
      if (!['USD', 'EUR', 'GBP', 'JPY'].includes(updateData.defaultCurrency)) {
        throw new Error('La devise par défaut est invalide.');
      }
      user.defaultCurrency = updateData.defaultCurrency;
    }
    if (updateData.pressReviewKeywords)
      user.pressReviewKeywords = updateData.pressReviewKeywords;

    await user.save();
    return user;
  },
};

export default userService;
