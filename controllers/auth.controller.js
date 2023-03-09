const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

//const maxAge = 3 * 24 * 60 * 60 * 1000;
const maxAge = 30000; //10 min

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
    res.cookie("jwt", token, { httpOnly: true, maxAge, sameSite: 'none', secure : true, path:"/"}); //
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  
     console.log("token avant clear", createToken(), jwt);
  res.clearCookie("jwt");
 // res.clearCookie("jwt", {path:"/"});
  res.cookie("jwt", "", { maxAge: 1, path:"/", sameSite:"none" }); //dure 1ms ok fire
   console.log("token apres clear avant redir", createToken(), jwt);
  
   res.redirect("/");
   console.log("token apres redir", createToken(), jwt);
  
  //req.session.destroy((err) => {
  //  if (err) {
  //    console.log(err);
  //  } else {
  //    console.log("createtoken avant clear", createToken(), jwt);
  //    res.clearCookie("jwt");
  //    console.log("token apres clear avant redir",createToken(),  jwt);
  //    res.redirect("/");
  //    console.log("token apres redir", createToken(), jwt);
  //  }
  //});
  
  
  //res.cookie("jwt", "", { maxAge: 1 }); //dure 1ms
  // res.clearCookie("jwt");
  //console.log("deco");
 // res.redirect("/");
 // console.log("redi");
};
