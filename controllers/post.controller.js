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

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 1000000) throw Error("max size");
      // if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }

  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    likers: [],
    // comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//de base, fonctionne mais l'img ne peut pas etre editée
// module.exports.updatePost = (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unknown : " + req.params.id);

//   const updatedRecord = {
//     message: req.body.message, //seul le message peut etre édité
//   };

//   PostModel.findByIdAndUpdate(
//     req.params.id,
//     { $set: updatedRecord },
//     { new: true },
//     (err, docs) => {
//       if (!err) res.send(docs);
//       else console.log("Update error : " + err);
//     }
//   );
// };

//nouvel essai kwant
// Modif des informations d'un commentaire
exports.updatePost = (req, res, next) => {
  // console.log("req.file", req.file);
  // console.log("req.body.post", req.body.post);
  // console.log("req.body.message", req.body.message);
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
      // if (req.file.size > 500000) throw Error("max size");
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
              // ...JSON.parse(req.body.post),
              picture: "/uploads/posts/" + filename,
              // picture: `${req.protocol}://${req.get(
              //   "host"
              // )}/client/public/uploads/posts/${oldfilename}`,
              // picture:
              //   req.file !== null ? "./uploads/posts/" + oldfilename : "",
              //fonctionne mais sur post backend 5000
              // picture: `${req.protocol}://${req.get(
              //   "host"
              // )}/client/public/uploads/posts/${
              //   filename
              //"./uploads/posts/" + fileName : "",
              // req.file.filename
              // }`,

              // fs.unlink("client/public/uploads/posts/" + filename,
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

//avt derniere version
// //nouvel essai kwant
// // Modif des informations d'un commentaire
// exports.updatePost = (req, res, next) => {
//   // console.log("req.file", req.file);
//   // console.log("req.body.post", req.body.post);
//   // console.log("req.body.message", req.body.message);
//   console.log("req.body", req.body);
//   if (req.file) {
//     console.log("if");
//     PostModel.findOne({ _id: req.params.id })
//       .then((post) => {
//         const filename = req.body.posterId + Date.now() + ".jpg";
//         const oldfilename = post.picture.split("uploads/posts/")[1];
//         console.log("filename", filename),
//           console.log("oldfilename", oldfilename),
//           fs.unlink(`client/public/uploads/posts/${oldfilename}`, () => {
//             const postObject = {
//               posterId: req.body.posterId,
//               message: req.body.message,
//               // ...JSON.parse(req.body.post),
//               picture: `${req.protocol}://${req.get(
//                 "host"
//               )}/client/public/uploads/posts/${oldfilename}`,
//               // picture:
//               //   req.file !== null ? "./uploads/posts/" + oldfilename : "",
//               //fonctionne mais sur post backend 5000
//               // picture: `${req.protocol}://${req.get(
//               //   "host"
//               // )}/client/public/uploads/posts/${
//               //   filename
//               //"./uploads/posts/" + fileName : "",
//               // req.file.filename
//               // }`,

//               // fs.unlink("client/public/uploads/posts/" + filename,
//             };
//             console.log("req.file", req.file),
//               console.log("postObject", postObject),
//               PostModel.updateOne(
//                 { _id: req.params.id },
//                 { ...postObject, _id: req.params.id }
//               )
//                 .then(() => res.status(200).json({ message: "Post modifié!" }))
//                 .catch((error) => res.status(400).json({ error }));
//           });
//       })
//       .catch((error) => res.status(500).json({ error }));
//   } else {
//     console.log("else");
//     const postObject = { ...req.body };
//     PostModel.updateOne(
//       { _id: req.params.id },
//       { ...postObject, _id: req.params.id }
//     )
//       .then(() => res.status(200).json({ message: "Post modifié!" }))
//       .catch((error) => res.status(400).json({ error }));
//   }
// };

//tt fonctionne sauf l'upload de limg, certaienment a cause du host quil manque
// //nouvel essai kwant
// // Modif des informations d'un commentaire
// exports.updatePost = (req, res, next) => {
//   // console.log("req.file", req.file);
//   // console.log("req.body.post", req.body.post);
//   // console.log("req.body.message", req.body.message);
//   console.log("req.body", req.body);
//   if (req.file) {
//     console.log("if");
//     PostModel.findOne({ _id: req.params.id })
//       .then((post) => {
//         const filename = req.body.posterId + Date.now() + ".jpg";
//         const oldfilename = post.picture.split("uploads/posts/")[1];
//         console.log("filename", filename),
//           console.log("oldfilename", oldfilename),
//           fs.unlink(`client/public/uploads/posts/${oldfilename}`, () => {
//             const postObject = {
//               posterId: req.body.posterId,
//               message: req.body.message,
//               // ...JSON.parse(req.body.post),
//               picture:
//                 req.file !== null ? "./uploads/posts/" + oldfilename : "",
//               //fonctionne mais sur post backend 5000
//               // picture: `${req.protocol}://${req.get(
//               //   "host"
//               // )}/client/public/uploads/posts/${
//               //   filename
//               //"./uploads/posts/" + fileName : "",
//               // req.file.filename
//               // }`,

//               // fs.unlink("client/public/uploads/posts/" + filename,
//             };
//             console.log("req.file", req.body.file),
//               console.log("postObject", postObject),
//               PostModel.updateOne(
//                 { _id: req.params.id },
//                 { ...postObject, _id: req.params.id }
//               )
//                 .then(() =>
//                   res.status(200).json({ message: "Post modifié!" })
//                 )
//                 .catch((error) => res.status(400).json({ error }));
//           });
//       })
//       .catch((error) => res.status(500).json({ error }));
//   } else {
//     console.log("else");
//     const postObject = { ...req.body };
//     PostModel.updateOne(
//       { _id: req.params.id },
//       { ...postObject, _id: req.params.id }
//     )
//       .then(() => res.status(200).json({ message: "Post modifié!" }))
//       .catch((error) => res.status(400).json({ error }));
//   }
// };

// de base, modif 2 ou 3
// module.exports.updatePost = (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unknown : " + req.params.id);

//   const updatedRecord = {
//     message: req.body.message, //seul le message peut etre édité
//     picture: req.body.picture,
//     // e !== null ? "./uploads/posts/" + fileName : "",
//   };
//   //   //mes console.log
//   console.log("updaterecord", updatedRecord);
//   console.log("req.body", req.body);
//   console.log("req.body.message", req.body.message);
//   console.log("req.body.picture", req.body.picture);

//   PostModel.findByIdAndUpdate(
//     req.params.id,
//     { $set: updatedRecord },
//     { new: true },
//     (err, docs) => {
//       console.log("docs", docs);
//       if (!err) res.send(docs);
//       else console.log("Update error : " + err);
//     }
//   );
// };

//de base mdif
// module.exports.updatePost = (req, res) => {
//   // let fileName = req.body.posterId + Date.now() + ".jpg";
//   // console.log("file.name", req.file);
//   // console.log("file", req.file);
//   // let fileName = req.file;
//   // if (!ObjectID.isValid(req.params.id))
//   //   return res.status(400).send("ID unknown : " + req.params.id);

//   const updatedRecord = {
//     message: req.body.message, //seul le message peut etre édité
//     // picture: req.file !== null ? "./uploads/posts/" + fileName : "",
//   };

//   // console.log("filename", fileName);
//   PostModel.findByIdAndUpdate(
//     req.params.id,
//     { $set: updatedRecord },
//     { new: true },
//     (err, docs) => {
//       if (!err) res.send(docs);
//       else console.log("Update error : " + err);
//     }
//   );
// };

// //p6 modif ca avance ac celui ci
// //------MODIFIER UNE SAUCE------
// exports.updatePost = (req, res, next) => {
//   const filename = "hello.jpeg";
//   const updatedRecord = req.file
//     ? {
//         ...JSON.parse(req.body.post),
//         picture: `${req.protocol}://${req.get("host")}/uploads/posts/${
//           filename
//           // req.file.filename
//         }`,
//       }
//     : { ...req.body };

//   //mes console.log
//   console.log("update", updatedRecord);
//   console.log("req.body", req.body);
//   console.log("req.body.message", req.body.message);
//   console.log("req.body.picture", req.body.picture);
//   req.file
//     ? console.log("req.file.filename", req.file.filename)
//     : console.log("pas dimage");

//   delete updatedRecord._userId;
//   PostModel.findOne({ _id: req.params.id })
//     .then((post) => {
//       console.log("post", post);
//       if (post.userId != req.auth.userId) {
//         res.status(401).json({ message: "Not authorized" });
//       } else {
//         PostModel.updateOne(
//           { _id: req.params.id },
//           { ...updatedRecord, _id: req.params.id }
//         )
//           .then(() => res.status(200).json({ message: "Post modifié !" }))
//           .catch((error) => res.status(401).json({ error }));
//       }
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

//p6 modif
// module.exports.updatePost = (req, res) => {
//   console.log("req.message", req.message);
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unknown : " + req.params.id);

//   const updatedRecord = req.file
//     ? {
//         ...JSON.parse(req.body.message),
//         picture: `${req.protocol}://${req.get("host")}/uploads/posts/${
//           req.file
//         }`,
//       }
//     : { ...req.body };
//   // message: req.body.message, //seul le message peut etre édité
//   console.log("updaterecord", updatedRecord);
//   console.log("req.body.message", req.body.message);
//   console.log("req.body", req.body);
//   // console.log("req.file.filename", req.file);
//   console.log("req.file", req.file);
//   PostModel.findByIdAndUpdate(
//     req.params.id,
//     { $set: updatedRecord },
//     { new: true },
//     (err, docs) => {
//       if (!err) res.send(docs);
//       else console.log("Update error : " + err);
//     }
//   );
// };
//file nan

// module.exports.updatePost = (req, res) => {
//   let fileName = req.body.posterId + Date.now() + ".jpg";
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unknown : " + req.params.id);

//   const updatedRecord = {
//     message: req.body.message, //seul le message peut etre édité
//     picture: req.file !== null ? "./uploads/posts/" + fileName : "",
//     //pour editer l'image
//   };

//   PostModel.findByIdAndUpdate(
//     req.params.id,
//     { $set: updatedRecord },
//     { new: true },
//     (err, docs) => {
//       if (!err) res.send(docs);
//       else console.log("Update error : " + err);
//     }
//   );
// };

// module.exports.updatePost = async (req, res) => {
//   //add create
//   let fileName;

//   if (req.file !== null) {
//     console.log("req.file", req.file);
//     // try {
//     //   if (
//     //     req.file.detectedMimeType != "image/jpg" &&
//     //     req.file.detectedMimeType != "image/png" &&
//     //     req.file.detectedMimeType != "image/jpeg"
//     //   )
//     //     throw Error("invalid file");

//     //   if (req.file.size > 1000000) throw Error("max size");
//     //   // if (req.file.size > 500000) throw Error("max size");
//     // } catch (err) {
//     //   console.log("erreur format");
//     //   const errors = uploadErrors(err);
//     //   return res.status(201).json({ errors });
//     // }
//     fileName = req.body.posterId + Date.now() + ".jpg";
//     console.log("filename", fileName);

//     await pipeline(
//       console.log("req.file", req.file),

//       req.file.stream,
//       fs.createWriteStream(
//         `${__dirname}/../client/public/uploads/posts/${fileName}`
//       )
//     );
//   }

// try {
//   const post = await updatedRecord.save();
//   return res.status(201).json(post);
// } catch (err) {
//   return res.status(400).send(err);
// }

//fin add create

// if (!ObjectID.isValid(req.params.id))
//   return res.status(400).send("ID unknown : " + req.params.id);

// const updatedRecord = {
//   message: req.body.message, //seul le message peut etre édité
//   picture: req.file !== null ? "./uploads/posts/" + fileName : "",
//   //pour editer l'image
// };

//   PostModel.findByIdAndUpdate(
//     req.params.id,
//     { $set: updatedRecord },
//     { new: true },
//     (err, docs) => {
//       if (!err) res.send(docs);
//       else console.log("Update error : " + err);
//     }
//   );
// };

//delete

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
        //unlink suivi d'un callback car c'est une fonction asynchrone, , une fois que la suppression a eu lieu on appelle la methode qui surpprime le post de la database
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
    //probleme set headers resolu en mettant le 1er en .then et le 2e en if
    //   .then((data) => res.send(data))
    //   .catch((err) => res.status(500).send({ message: err }));
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
    //   .then((data) => res.send(data))
    //   .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};
