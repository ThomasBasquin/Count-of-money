import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().min(3).max(15).regex(/^\S*$/),
  email: Joi.string()
    .email()
    .pattern(/.+@.+\..+/),
  password: Joi.string().min(6).regex(/^\S*$/),
  defaultCurrency: Joi.string()
    .default('EUR')
    .valid('USD', 'EUR', 'GBP', 'JPY'),
  cryptoCurrencies: Joi.array().items(Joi.string().trim()),
  pressReviewKeywords: Joi.array().items(Joi.string().trim()),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export default validateUser;
