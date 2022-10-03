/*----------Page profil si connecté sinon, page de connexion----------*/

import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";
import UserPosts from "../components/Profil/UserPosts";
import GoUp from "../components/GoUp";

const Profil = () => {
  const uid = useContext(UidContext);
  console.log("uid", uid);
  return (
    <div className="profil-page">
      {uid === "null" && console.log("wait uid")}
      {uid ? (
        <div id="top">
          <UpdateProfil />
          <UserPosts />
          <GoUp />
        </div>
      ) : (
        <div className="log-container">
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
    </div>
  );
};

export default Profil;
