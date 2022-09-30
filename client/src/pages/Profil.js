/*----------Page profil si connecté sinon, page de connexion----------*/

import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";
import UserPosts from "../components/Profil/UserPosts";
// import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);
  console.log("uid", uid);
  return (
    <div className="profil-page">
      {uid === "null" && console.log("wait uid")}
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          {/* <Log /> */}
          <Log signin={true} signup={false} />
          <div className="img-container">
            <img
              src="./img/logo_brown.svg"
              alt="img-log"
              className="rotateImg"
            />
          </div>
        </div>
      )}
      <UserPosts />
    </div>
  );
};

export default Profil;
