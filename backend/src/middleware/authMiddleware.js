const isAuth = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ message: 'Non autorisé' });
};

const isNotAuth = (req, res, next) => {
  if (!req.session.userId) {
    return next();
  }
  res.status(400).json({ message: 'Déjà connecté' });
};

export { isAuth, isNotAuth };
