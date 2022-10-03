import React from "react";
import { useDispatch } from "react-redux";
import { getPosts, deletePost } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () =>
    dispatch(deletePost(props.id)).then(() => dispatch(getPosts()));

  return (
    <div
      className="delete"
      onClick={() => {
        if (window.confirm("Souhaitez-vous réellement supprimer ce post ?")) {
          deleteQuote();
        }
      }}
    >
      <div className="delete_text">Supprimer le post ? </div>
      <div className="delete_icon">
        <i className="fa-solid fa-comment-slash i_post_delete"></i>
      </div>{" "}
    </div>
  );
};

export default DeleteCard;
