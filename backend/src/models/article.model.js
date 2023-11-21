import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Un identifiant d'article est requis"],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Un titre est requis'],
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      trim: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    articleUrl: {
      type: String,
      required: [true, "L'URL de l'article est requise"],
      trim: true,
      match: [
        /^(https?):\/\/[^\s$.?#].[^\s]*$/,
        "Veuillez entrer une URL valide pour l'article",
      ],
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

const Article = mongoose.model('Article', articleSchema);

export default Article;
