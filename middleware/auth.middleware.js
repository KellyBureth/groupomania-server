const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt; //recupere le token
  if (token) {
    //si il existe un token
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      //on le decode
      if (err) {
        res.locals.user = null;
        // res.redirect("/profil");
        // res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        console.log("cookie ok back midleware check");
        next();
      }
    });
  }
  // else if (!token) {res.redirect("/profil");}
  else {
    res.locals.user = null;
    // res.redirect("/profil");
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        // res.redirect("/profil");
        res.send(200).json("no token"); //si pas de token pas de next
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
    // res.redirect("/profil");
  }
};
