const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");
//const fs = require("fs");
const multer = require("multer");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
  const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
  };

  try {
    if (!MIME_TYPES) throw Error("invalid file"); //un throw passe directement au catch

    if (req.file.size > 1000000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.name + ".jpg"; //le nom de la photo est le pseudo de l'user, donc en modifiant l'image de profil, ça remplacera l'ancienne photo

  await pipeline(
    req.file.stream,
    //fs.createWriteStream(
    //  `${__dirname}/../client/public/uploads/profil/${fileName}` //stock image dans dossier upload profil dans le front
    //)
    
    multer.diskStorage({
  destination: './images/',
  filename: (req, file, cb) => {
    return cb(null, new Date().toISOString().replace(/[/\:]/g, "_") + file.originalname)
  },
});
    
  );

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      //{ $set: { picture:  "../client/public/uploads/profil/" + fileName } }, //same error
    { $set: { picture: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
