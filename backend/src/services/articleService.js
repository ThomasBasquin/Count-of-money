import Article from '../models/article.model.js';

const articleService = {
  getArticles: async (params1, loggedIn, userSettings) => {
    try {
      let query = {};

      if (loggedIn) {
        // Use user settings to filter relevant articles (based on keywords, preferences, etc.)
        // Modify the query based on user settings (userSettings) if available
        // Example: query based on keywords from user settings
        // query.keywords = { $in: userSettings.keywords };
      }

      const articles = await Article.find(query).limit(20); // Limiting to 20 articles for demonstration
      return articles;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getArticleById: async (id) => {
    try {
      const article = await Article.findById(id);
      return article;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default articleService;
