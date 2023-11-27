import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().min(3).max(15).pattern(/^\S*$/, 'no spaces').message({
    'string.min': "Le nom d'utilisateur doit contenir au moins 3 caractères.",
    'string.max': "Le nom d'utilisateur ne doit pas dépasser 15 caractères.",
    'string.pattern.name':
      "Le nom d'utilisateur ne doit pas contenir d'espaces.",
  }),
  email: Joi.string()
    .email()
    .message('Veuillez entrer une adresse email valide.'),
  password: Joi.string().min(6).pattern(/^\S*$/, 'no spaces').message({
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères.',
    'string.pattern.name': "Le mot de passe ne doit pas contenir d'espaces.",
  }),
  defaultCurrency: Joi.string()
    .default('EUR')
    .valid('USD', 'EUR', 'GBP', 'JPY')
    .message(
      "La devise par défaut doit être l'une des valeurs suivantes : USD, EUR, GBP, JPY."
    ),
  cryptoCurrencies: Joi.array()
    .items(Joi.string().trim())
    .message('Chaque crypto-monnaie doit être une chaîne de caractères.'),
  pressReviewKeywords: Joi.array()
    .items(Joi.string().trim())
    .message('Chaque mot-clé doit être une chaîne de caractères.'),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export default validateUser;
