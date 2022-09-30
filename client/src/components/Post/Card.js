import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
// import FollowHandler from "../Profil/FollowHandler";
import LikeButton from "./LikeButton";
import { getPosts, updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
// import CardComments from "./CardComments";
// require("dotenv").config({ path: "../../../.env" });
// require("./config/db");

const Card = ({ post }) => {
  //post entre accolade est le props envoyé par Thread.js qui map tous les posts
  const [isLoading, setIsLoading] = useState(true); //loading spinner, sur true tant que ca charge
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  //   const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer); //info user pour afficher le pseudo
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPostsReducer);

  const ADMIN = process.env.REACT_APP_API_ADMIN_ROLE;

  //essai edit img
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  // const handlePicture = (e) => {
  //   setPostPicture(URL.createObjectURL(e.target.files[0]));
  //   setFile(e.target.files[0]);
  // };

  // const updateItem = () => {
  //   if (textUpdate || postPicture) {
  //     console.log("textupdate", textUpdate);
  //     console.log("file", file);
  //     // dispatch(updatePost(post._id, textUpdate, file));
  //     // data.append("message", message);
  //     // if (file) textUpdate.append("file", file);
  //     data.append("message", textUpdate);
  //     if (file) data.append("file", file);
  //     // if (file) dispatch(updatePost(post._id, file));
  //   }
  //   setIsUpdated(false);
  // };

  //new essai
  // const updateItem = () => {
  //   if (textUpdate || postPicture) {
  //     const data = new FormData();
  //     data.append("posterId", userData._id);
  //     data.append("message", textUpdate);
  //     if (file) data.append("file", file);
  //     dispatch(updatePost(data));
  //   } else {
  //     alert("Veuillez entrer un message");
  //   }
  //   setIsUpdated(false);
  // };

  // //de uploadimg picture profil
  // const handlePicture = (e) => {
  //   // e.preventDefault();
  //   const data = new FormData(); //objet js pour mettre dans un package l'image plus des infos au back
  //   // data.append("name", userData.pseudo);
  //   // data.append("userId", userData._id);
  //   data.append("file", file);

  //   dispatch(updatePost(data, post._id)); //pour le back, fonction dans user.actions
  // };
  // console.log("txt", textUpdate, "postPicture", postPicture, "fil", file);

  //  new esai avec FormData
  const updateItemData = async () => {
    if (textUpdate || file) {
      const data = new FormData();
      data.append("posterId", post.posterId);
      data.append("postId", post._id); //ICI !!! je dois recup l'id du post
      if (textUpdate) data.append("message", textUpdate);
      if (file) data.append("file", file);
      await dispatch(updatePost(data, post._id)).then(() =>
        dispatch(getPosts())
      );
      // await dispatch(updatePost(data, post._id));
      // dispatch(updatePost(post._id, textUpdate, postPicture))
      console.log(
        "txt",
        textUpdate,
        "postPicture",
        postPicture,
        "fil",
        file,
        "data",
        data,
        "post",
        post,
        "post._id",
        post._id
      );
    } else {
      alert("Veuillez entrer un message");
    }
    setIsUpdated(false);
  };

  // de base modif,  le meilleur pour le moment
  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate, postPicture.name));
      console.log("txt", textUpdate, "postPicture", postPicture.name);
    }

    //de base modif,  le meilleur pour le moment copie
    // const updateItem = () => {
    //   if (textUpdate) {
    //     dispatch(updatePost(post._id, textUpdate, postPicture.name));
    //     console.log("txt", textUpdate, "postPicture", postPicture.name);
    //   }
    // if (postPicture) {
    //   console.log("file", postPicture);
    //   dispatch(updatePost(post._id, postPicture));
    //   // handlePicture();
    // }
    // //de base
    // const updateItem = () => {
    //   if (textUpdate || postPicture) {
    //     dispatch(updatePost(post._id, textUpdate, postPicture));
    //   }
    // if (postPicture) {
    //   dispatch(updatePost(post._id, textUpdate, postPicture));
    // }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]); //si le store des posts est plein (a chargé les données redux), on arrete le load spinner

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                    else return null;
                  })
                  .join("") //pour ne pas avoir de virgule entre chaque element
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
                {/* {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )} */}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                {/* essai edit img */}
                <div className="icon">
                  <>
                    <label htmlFor="file-upload">
                      <i className="fa-regular fa-image"></i>
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      // onChange={(e) => handlePicture(e)}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </>
                </div>
                <div className="button-container">
                  {/* <button className="btn" onClick={handlePost}> */}
                  <button className="btn" onClick={updateItemData}>
                    Valider les modifications
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}

            {/* {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )} */}

            {/* {userData._id === post.posterId && ( */}
            <div className="button-container">
              {(userData._id === post.posterId || userData.role === ADMIN) && (
                <div className="editDelete">
                  <div
                    className="edit"
                    onClick={() => setIsUpdated(!isUpdated)}
                  >
                    <div className="edit_text">Editer le post ? </div>

                    <div className="edit_icon">
                      <img
                        src="./img/icons/edit-post-brown.svg"
                        alt="edit a post"
                        className="i_post_edit"
                      />
                    </div>
                  </div>
                  <DeleteCard id={post._id} />
                </div>
              )}
              <LikeButton post={post} />
            </div>
            {/* <div className="card-footer"> */}
            {/* <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div> */}
            {/* <LikeButton post={post} /> */}
            {/* </div> */}
            {/* {showComments && <CardComments post={post} />} */}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
