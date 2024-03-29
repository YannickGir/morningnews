var express = require("express");
var router = express.Router();

var uid2 = require("uid2");
var bcrypt = require("bcrypt");

<<<<<<< HEAD
var userModel = require("../models/users");
var ArticleModel = require("../models/articles");
=======
var userModel = require('../models/users');
var ArticleModel = require('../models/articles');
>>>>>>> f825168ee87b3930afb3e25a5c86f887719e455e

router.post("/sign-up", async function (req, res, next) {
  console.log("je suis Yannick");
  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;

  const data = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (data != null) {
    error.push("utilisateur déjà présent");
  }

  if (
    req.body.usernameFromFront == "" ||
    req.body.emailFromFront == "" ||
    req.body.passwordFromFront == ""
  ) {
    error.push("champs vides");
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
      language: "fr",
    });

    saveUser = await newUser.save();

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, saveUser, error, token });
});

router.post("/sign-in", async function (req, res, next) {
  var result = false;
  var user = null;
  var error = [];
  var token = null;

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true;
        token = user.token;
      } else {
        result = false;
        error.push("mot de passe incorrect");
      }
    } else {
      error.push("email incorrect");
    }
  }

  res.json({ result, user, error, token });
});

//---------------ROUTE EN POST EN BDD DEPUIS SCREENARTICLESBYSOURCE-----------------------
router.post('/add-article', async function (req, res, next) {
  var newUserArticle = new ArticleModel({
    title: req.body.titleFromFront,
    description: req.body.descriptionFromFront,
    content: req.body.contentFromFront,
    urlToImage: req.body.imageFromFront,
    language: req.body.languageFromFront,
  });

  var userArticlesSaved = await newUserArticle.save();

  var userToken = req.body.user.token;
  var searchUser = await userModel.updateOne(
    { token: userToken },
    { $push: { userArticles: articleID } }
  );

  res.json({ userArticlesSaved });
});

//---------------SUPPRIMER UN ARTICLE DE MYARTICLES-----------------------

//---------------ROUTE VOIR TOUS LES ARTICLES EN GET SAUV EN BDD DEPUIS SCREENMYARTICLES-----------------------
router.get('/myarticles', async function (req, res, next) {
  var userID = req.body.user._id;
  var userToken = req.body.user.token;
  var userTest = await userModel
    .findById(userID)
    .populate('userArticles')
    .exec();
  var tab = [];
  for (var i = 0; i < userTest.userArticles.length; i++) {
    var article = await ArticleModel.findById(userTest.userArticles[i]);
    tab.push(article);
  }
  res.json({ userToken, userArticles: tab });
});

module.exports = router;
