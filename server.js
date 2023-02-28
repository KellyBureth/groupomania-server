const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();

// Middleware pour gérer les erreurs de CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://groupomania-intranet.netlify.app"); // autorise uniquement les requêtes provenant de ce domaine
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // autorise les méthodes HTTP utilisées
  res.header("Access-Control-Allow-Credentials", true); // autorise les cookies et les en-têtes de sécurité
  next();
});

//cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedOrigins: ["https://groupomania-intranet.netlify.app/"],
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// server
app.listen(process.env.PORT || 3000, () => {
  console.log(Listening on port ${process.env.PORT});
});

//pour parser la requete (la mettre au bon format), ça remplace bodyparser qui est inclus dans express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
