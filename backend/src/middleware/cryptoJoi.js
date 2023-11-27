import Joi from 'joi';

const cryptoSchema = Joi.object({
  cmid: Joi.string().required().messages({
    'string.empty': 'Un identifiant de crypto-monnaie est requis',
    'any.required': 'Un identifiant de crypto-monnaie est requis',
  }),
  name: Joi.string().required().messages({
    'string.empty': 'Le nom complet de la crypto-monnaie est requis',
    'any.required': 'Le nom complet de la crypto-monnaie est requis',
  }),
  currentPrice: Joi.number().required().messages({
    'number.base': 'Le prix actuel doit être un nombre',
    'any.required': 'Le prix actuel est requis',
  }),
  openingPrice: Joi.number().required().messages({
    'number.base': "Le prix à l'ouverture doit être un nombre",
    'any.required': "Le prix à l'ouverture est requis",
  }),
  lowestPriceOfDay: Joi.number().required().messages({
    'number.base': 'Le prix le plus bas du jour doit être un nombre',
    'any.required': 'Le prix le plus bas du jour est requis',
  }),
  highestPriceOfDay: Joi.number().required().messages({
    'number.base': 'Le prix le plus haut du jour doit être un nombre',
    'any.required': 'Le prix le plus haut du jour est requis',
  }),
  imageUrl: Joi.string()
    .regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)
    .required()
    .messages({
      'string.pattern.base': "Veuillez entrer une URL valide pour l'image",
      'string.empty': "L'URL de l'image est requise",
      'any.required': "L'URL de l'image est requise",
    }),
});

const validateCrypto = (req, res, next) => {
  const { error } = cryptoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateCrypto;
