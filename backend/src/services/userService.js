import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const userService = {
  Create: async ({ username, email, password }) => {
    const user = new User({ username, email, password });
    await user.save();
    return user;
  },
  Login: async ({ email, password }) => {
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
};

export default userService;
