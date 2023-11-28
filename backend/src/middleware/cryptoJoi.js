import Joi from 'joi';

const cryptoSchema = Joi.object({
  cmid: Joi.string()
    .pattern(/^[A-Z0-9]+$/)
    .required(),
  name: Joi.string().required(),
  currentPrice: Joi.number(),
  openingPrice: Joi.number(),
  lowestPriceOfDay: Joi.number(),
  highestPriceOfDay: Joi.number(),
  imageUrl: Joi.string().pattern(
    new RegExp('(http(s?):)([/|.|w|s|-])*.(?:jpg|gif|png)')
  ),
});

const validateCrypto = (req, res, next) => {
  const { error } = cryptoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export default validateCrypto;
