import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema(
  {
    cmid: {
      type: String,
      required: [true, 'Un identifiant de crypto-monnaie est requis'],
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
      required: [true, 'Le prix actuel est requis'],
    },
    openingPrice: {
      type: Number,
      required: [true, "Le prix à l'ouverture est requis"],
    },
    lowestPriceOfDay: {
      type: Number,
      required: [true, 'Le prix le plus bas du jour est requis'],
    },
    highestPriceOfDay: {
      type: Number,
      required: [true, 'Le prix le plus haut du jour est requis'],
    },
    imageUrl: {
      type: String,
      required: [true, "L'URL de l'image est requise"],
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
