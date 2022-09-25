import React, { useEffect, useState } from "react";
import NewPostForm from "./NewPostForm";

const AddPostButton = () => {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false);

  //envoi du post qui retire l'affichage de creation de post et remet le bouton d'ajout de post
  useEffect(() => {
    // if (!isEmpty(userData)) setIsLoading(false);
    setIsFormDisplayed(true);
  });
  return (
    <div>
      {isFormDisplayed ? (
        <div className="newPostForm">
          <NewPostForm />
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
            name="creatingPost_button"
            id="creatingPost_button"
          />{" "}
          <label
            htmlFor="creatingPost_button"
            className="creatingPost_textButton"
          >
            <i className="fas fa-circle-plus i_plus"></i> Exprimez-vous !
          </label>
          {/* //   <div className="newPostForm">
    //     <NewPostForm />
    //   </div> */}
        </div>
      )}
    </div>
  );
};

export default AddPostButton;
