const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

//const maxAge = 3 * 24 * 60 * 60 * 1000;
const maxAge = 10;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge, sameSite: 'none', secure : true}); //brody no domain
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  
  
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("token avant clear", token);
      res.clearCookie("jwt");
      console.log("token apres clear avant redir", token);
      res.redirect("/");
      console.log("token apres redir", token);
    }
  });
  
  
  //res.cookie("jwt", "", { maxAge: 1 }); //dure 1ms
  // res.clearCookie("jwt");
  //console.log("deco");
 // res.redirect("/");
 // console.log("redi");
};
