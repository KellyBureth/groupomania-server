const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId; //pour que les id soients reconnus par la base de données

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password"); //-password pour ne pas envoyer le password avec toutes les données pour le front, même s'il est crypté
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    //si l'id n'est pas dans la base de donnée, la requête ne se poursuit pas
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pseudo: req.body.pseudo,
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id, //notre id
      { $addToSet: { following: req.body.idToFollow } }, //$addToSet rajoute dans notre tableau following l'id "idToFollow" de la personne à suivre
      { new: true, upsert: true }
        // ,
        // (err, docs) => {
        //   if (!err) res.status(201).json(docs);
        //   else return res.status(400).json(err);
        // }
        // .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }))
    ),
      // add to following list
      await UserModel.findByIdAndUpdate(
        console.log("ici", req.params.id, req.body.idToFollow),
        req.body.idToFollow, //l'id de la personne suivre
        { $addToSet: { followers: req.params.id } }, //rajoute dans le tableau de la personne suivie notre id dans son tableau followers
        { new: true, upsert: true },
        (err, docs) => {
          // if (!err) res.status(201).json(docs);else
          if (err) return res.status(400).json(err);
        }
        //   .then((data) => res.send(data))
        //   .catch((err) => res.status(500).send({ message: err }))
      );
  } catch (err) {
    return res.status(501).json({ message: err });
  }
};

module.exports.unfollow = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    userModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
        // ,
        // (err, docs) => {
        //   if (!err) res.status(201).json(docs);
        //   else return res.status(400).json(err);
        // }
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }))
    ),
      // Retirer de la liste des followers
      userModel.findByIdAndUpdate(
        req.body.idToUnfollow,
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else if (err) return res.status(400).json(err);
        }
        //   .then((data) => res.send(data))
        //   .catch((err) => res.status(500).send({ message: err }))
      );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
