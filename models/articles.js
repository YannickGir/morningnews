const mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
  title: String,
  description: String,
  content: String,
  urlToImage: String,
  language: String,
});

var ArticleModel = mongoose.model('articles', articleSchema);

module.exports = ArticleModel;
