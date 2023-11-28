import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema(
  {
    cmid: {
      type: String,
      required: [true, 'Un identifiant de crypto-monnaie est requis'],
      uppercase: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Le nom complet de la crypto-monnaie est requis'],
      trim: true,
    },
    currentPrice: {
      type: Number,
    },
    openingPrice: {
      type: Number,
    },
    lowestPriceOfDay: {
      type: Number,
    },
    highestPriceOfDay: {
      type: Number,
    },
    imageUrl: {
      type: String,

      trim: true,
      match: [
        /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,
        "Veuillez entrer une URL valide pour l'image",
      ],
    },
  },
  { timestamps: true }
);

const CryptoCurrency = mongoose.model('CryptoCurrency', cryptoSchema);

export default CryptoCurrency;
