import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      className="delete"
      onClick={() => {
        if (window.confirm("Souhaitez-vous réellement supprimer ce post ?")) {
          deleteQuote();
        }
      }}
    >
      {/* <div className="delete_button"> */}
      <div className="delete_text">Supprimer le post ? </div>
      <div className="delete_icon">
        <i className="fa-solid fa-comment-slash i_post_delete"></i>
      </div>{" "}
      {/* </div> */}
    </div>
  );
};

export default DeleteCard;
