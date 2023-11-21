import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Le nom d'utilisateur est requis"],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [3, "Le nom d'utilisateur doit avoir au moins 3 caractères"],
      maxLength: [
        30,
        "Le nom d'utilisateur ne peut pas dépasser 30 caractères",
      ],
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      minLength: [6, 'Le mot de passe doit avoir au moins 6 caractères'],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Veuillez entrer une adresse email valide'],
    },
    defaultCurrency: {
      type: String,
      default: 'EUR',
      enum: ['USD', 'EUR', 'GBP', 'JPY'],
    },
    cryptoCurrencies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CryptoCurrency',
      },
    ],
    pressReviewKeywords: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
