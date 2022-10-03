import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import { getPosts, updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";

const Card = ({ post }) => {
  //post entre accolade est le props envoyé par Thread.js qui map tous les posts
  const [isLoading, setIsLoading] = useState(true); //loading spinner, sur true tant que ca charge
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const usersData = useSelector((state) => state.usersReducer); //info user pour afficher le pseudo et autre info user
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const ADMIN = process.env.REACT_APP_API_ADMIN_ROLE;
  const [file, setFile] = useState();

  const updateItemData = async () => {
    if (textUpdate || file) {
      const data = new FormData();
      data.append("posterId", post.posterId);
      data.append("postId", post._id);
      if (textUpdate) data.append("message", textUpdate);
      if (file) data.append("file", file);
      await dispatch(updatePost(data, post._id)).then(() =>
        dispatch(getPosts())
      );
    } else {
      alert("Veuillez entrer un message");
    }
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
                <div className="icon">
                  <>
                    <label htmlFor="file-upload">
                      <i className="fa-regular fa-image none"></i>
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </>
                </div>
                <div className="button-container">
                  <button className="btn" onClick={updateItemData}>
                    Valider les modifications
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
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
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
