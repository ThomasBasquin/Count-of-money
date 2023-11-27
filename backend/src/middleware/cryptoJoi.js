import Joi from 'joi';

const cryptoSchema = Joi.object({
  cmid: Joi.string().required(),
  name: Joi.string().required(),
  currentPrice: Joi.number().required(),
  openingPrice: Joi.number().required(),
  lowestPriceOfDay: Joi.number().required(),
  highestPriceOfDay: Joi.number().required(),
  imageUrl: Joi.string()
    .pattern(new RegExp('(http(s?):)([/|.|w|s|-])*.(?:jpg|gif|png)'))
    .required(),
});

const validateCrypto = (req, res, next) => {
  const { error } = cryptoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export default validateCrypto;
