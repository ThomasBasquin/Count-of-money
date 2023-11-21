import userService from '../services/userService.js';

const userController = {
  register: async (req, res) => {
    try {
      const user = await userService.Create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const user = await userService.Login(req.body);
      req.session.user = user;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProfile: async (req, res) => {
    try {
      const user = await userService.GetProfile(req.session.user._id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const user = await userService.UpdateProfile(
        req.session.user._id,
        req.body
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      await userService.logout(req.session.user._id);
      req.session.destroy();
      res.status(200).json({ message: 'User logged out' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default userController;
