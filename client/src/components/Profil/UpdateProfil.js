import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false); //pour que le formulaire disparaisse au profit de l'affichage initial
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && ( //si le formulaire n'est pas visible
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>{" "}
                {/* en cliquant sur le textarea, ça affiche le formulaire (updateForm devient true, donc !updateform car de base sur false)*/}
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier ma bio
                </button>
              </>
            )}
            {updateForm && ( //si upadateform est sur true (donc apres avoir cliqué dans le text area)
              <>
                <textarea //le textarea s'affiche
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>
                  {/* le bouton s'affiche , le fragment car plusieurs choses à afficher*/}
                  Valider les modifications
                </button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          {/* la date de creation est donnée pas mongodb grace au timestamp dans le model, de base la date est au format chiffre, la fonction dateparser dans le fichier utils la met au format text */}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
