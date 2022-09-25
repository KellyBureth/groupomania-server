import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData(); //objet js pour mettre dans un package l'image plus des infos au back
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id)); //pour le back, fonction dans user.actions
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png" //pour que quand l'user ouvre l'explorateur pour editer son image, ça filtre les png, jpeg et jpg
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Valider" />
    </form>
  );
};

export default UploadImg;
