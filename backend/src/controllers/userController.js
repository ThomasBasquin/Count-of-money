import userService from '../services/userService.js';

const userController = {
  register: async (req, res) => {
    try {
      const user = await userService.create(req.body);
      res
        .status(201)
        .json({ id: user._id, username: user.username, email: user.email });
    } catch (error) {
      if (error.message.startsWith('Un utilisateur existe déjà')) {
        return res.status(409).json({ message: error.message });
      }
      if (error.message.startsWith('Le mot de passe')) {
        return res.status(400).json({ message: error.message });
      }
      if (error.message.startsWith("Le nom d'utilisateur")) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const user = await userService.login(req.body);
      req.session.user = user;
      res
        .status(200)
        .json({ id: user._id, username: user.username, email: user.email });
    } catch (error) {
      if (error.message.startsWith('Aucun utilisateur trouvé')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.startsWith('Mot de passe incorrect')) {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  },
  getProfile: async (req, res) => {
    try {
      const user = await userService.getProfile(req.session.user._id);
      res
        .status(200)
        .json({ id: user._id, username: user.username, email: user.email });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const user = await userService.updateProfile(
        req.session.user._id,
        req.body
      );
      res
        .status(200)
        .json({ id: user._id, username: user.username, email: user.email });
    } catch (error) {
      if (error.message.startsWith('Aucun utilisateur trouvé')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.startsWith("Le nom d'utilisateur")) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  },
  addFavorite: async (req, res) => {
    try {
      const user = await userService.addFavorite(
        req.session.user._id,
        req.body.cmid
      );
      res.status(200).json({ id: user._id, favorites: user.favorites });
    } catch (error) {
      if (error.message.startsWith('Aucun utilisateur trouvé')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.startsWith('Aucune crypto-monnaie trouvée')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.startsWith('La crypto-monnaie')) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  },
  removeFavorite: async (req, res) => {
    try {
      const user = await userService.removeFavorite(
        req.session.user._id,
        req.body.cmid
      );

      res.status(200).json({ id: user._id, favorites: user.favorites });
    } catch (error) {
      if (error.message.startsWith('Aucun utilisateur trouvé')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.startsWith('Aucune crypto-monnaie trouvée')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.startsWith('La crypto-monnaie')) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  },
  getFavorites: async (req, res) => {
    try {
      const user = await userService.getFavorites(req.session.user._id);
      res.status(200).json({ id: user._id, favorites: user.cryptoCurrencies });
    } catch (error) {
      if (error.message.startsWith('Aucun utilisateur trouvé')) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    if (req.session.user) {
      req.session.destroy();
      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'Déconnexion réussie' });
    }
    res.status(401).json({ message: 'Non autorisé' });
  },
};

export default userController;
