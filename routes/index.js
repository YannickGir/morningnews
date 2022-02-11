var express = require("express");
var router = express.Router();

var uid2 = require("uid2");
var bcrypt = require("bcrypt");

var userModel = require("../models/users");

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

//---------------ROUTE EN GET POUR SAUV EN BDD MY ARTICLES DEPUIS SCREENARTICLESBYSOURCE-----------------------
router.get("/screenMyarticles", async function (req, res, next) {
  // console.log(" req.session.articleSaved",  req.session.userSaved.userJourneys)

  // console.log(" req.session.userSaved.userJourneys",  req.session.userSaved.userJourneys)

  var user = await userModel.findById(userID).populate("userJourneys").exec();
  //  console.log("req.session.userSaved.userJourneys", user.userJourneys)

  res.render("screenMyarticles", { userJourneys: user.userJourneys });
});

//---------------ROUTE EN GET SAUV EN BDD DEPUIS SCREENMYARTICLES-----------------------
router.get("/screenMyarticles", async function (req, res, next) {
  var newUserJourney = new journeyModel([
    {
      _id: req.session.journeyticketsArray[i].id,
      departure: req.session.journeyticketsArray[i].departure,
      arrival: req.session.journeyticketsArray[i].arrival,
      date: req.session.journeyticketsArray[i].date,
      departureTime: req.session.journeyticketsArray[i].departureTime,
      price: req.session.journeyticketsArray[i].price,
    },
  ]);

  var userArticlesSaved = await newUserJourney.save();
  // console.log(" req.session.articleSaved",  req.session.userSaved.userJourneys)

  // console.log(" req.session.userSaved.userJourneys",  req.session.userSaved.userJourneys)

  var user = await userModel.findById(userID).populate("userJourneys").exec();
  //  console.log("req.session.userSaved.userJourneys", user.userJourneys)

  res.render("screenMyarticles", { userJourneys: user.userJourneys });
});

//---------------ROUTE VOIR TOUS LES ARTICLES EN GET SAUV EN BDD DEPUIS SCREENMYARTICLES-----------------------
router.get("/screenMyarticles", async function (req, res, next) {
  // console.log(" req.session.articleSaved",  req.session.userSaved.userJourneys)

  // console.log(" req.session.userSaved.userJourneys",  req.session.userSaved.userJourneys)

  var user = await userModel.findById(userID).populate("userJourneys").exec();
  //  console.log("req.session.userSaved.userJourneys", user.userJourneys)

  res.render("screenMyarticles", { userJourneys: user.userJourneys });
});

module.exports = router;
