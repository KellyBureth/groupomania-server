const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
  let fileName;
       console.log("hi");
     console.log("__dirname:", __dirname);
      console.log("fileName:", fileName);
  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 1000000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";
console.log("__dirname:", __dirname);
    await pipeline(
      req.file.stream,
      console.log("__dirname:", __dirname),
      console.log("fileName:", fileName),
      fs.createWriteStream(
        //`/uploads/posts/${fileName}` 
        //'' + `${__dirname}/../client/public/uploads/posts/${fileName}` //gpt
        //"./uploads/posts/" + fileName
        //"https://groupomania-intranet.netlify.app/uploads/posts/" + fileName //nn
        `${__dirname}/uploads/posts/${fileName}` //nn
        // `${__dirname}/../client/public/uploads/posts/${fileName}` //initial

      )  ,
      console.log("__dirname:", __dirname),
      console.log("fileName:", fileName),
    );
  }

  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    likers: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.updatePost = (req, res, next) => {
  console.log("req.body", req.body);
  if (req.file) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 1000000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    console.log("if");
    console.log("req.file", req.file);
    PostModel.findOne({ _id: req.params.id })
      .then((post) => {
        console.log("findone");
        const filename = req.body.posterId + Date.now() + ".jpg";
        const oldfilename = post.picture.split("uploads/posts/")[1];
        console.log("filename", filename),
          console.log("oldfilename", oldfilename),
          fs.unlink(`client/public/uploads/posts/${oldfilename}`, () => {
            pipeline(
              req.file.stream,
              fs.createWriteStream(
                `${__dirname}/../client/public/uploads/posts/${filename}` //stock image dans dossier upload profil dans le front
              )
            );
            const postObject = {
              posterId: req.body.posterId,
              message: req.body.message,
              picture: "/uploads/posts/" + filename,
            };
            console.log("req.file", req.file),
              console.log("postObject", postObject),
              PostModel.updateOne(
                { _id: req.params.id },
                { ...postObject, _id: req.params.id }
              )
                .then(() => res.status(200).json({ message: "Post modifié!" }))
                .catch((error) => res.status(400).json({ error }));
          });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    console.log("else");
    const postObject = { ...req.body };
    PostModel.updateOne(
      { _id: req.params.id },
      { ...postObject, message: req.body.message, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Post modifié!" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

//------SUPPRIMER UN POST ------
exports.deletePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = post.picture.split("uploads/posts/")[1];
      //[1] pour retirer le  './',
      console.log("filename", filename);
      console.log("post", post);
      console.log("post.picture", post.picture);
      fs.unlink("client/public/uploads/posts/" + filename, (err) => {
        console.log("filenamefs", filename);
        console.log("err", err);
        //unlink suivi d'un callback car c'est une fonction asynchrone, une fois que la suppression a eu lieu on appelle la methode qui surpprime le post de la database
        PostModel.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Post supprimée !" });
          })
          .catch((error) => res.status(401).json({ error }));
      });
      // }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id }, //ajoute l'id du liker dans le tableau du post liké
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id }, //ajoute l'id du post dans le tableau de l'utilisateur qui like
      },
      { new: true }
    ),
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      };
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    ),
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      };
  } catch (err) {
    return res.status(400).send(err);
  }
};
