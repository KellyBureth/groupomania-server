const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();

//cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
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

//ajout pour permettre aux token de se créer au login quand l'app est déployée
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://groupomania-intranet.netlify.app."); // d'accéder à notre API depuis n'importe quelle origine ( '*' ) donc tout le monde peut acceder à l'api
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //autorisation d'ajouter les headers mentionnés aux requêtes envoyées vers notre API  (Origin , X-Requested-With , etc.) ;
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //autorisation d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  next();
});


// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
