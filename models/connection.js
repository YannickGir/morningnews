var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(
  "mongodb+srv://Yannick:yannick@cluster0.rhyjx.mongodb.net/morningnews?retryWrites=true&w=majority",
  options,
  function (error) {
    if (error == null) {
      console.log("Connexion à la base de donnée réussie");
    } else {
      console.log(error);
    }
  }
);
