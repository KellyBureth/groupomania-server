import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
// import { Navigate } from "react-router-dom";
import LeftNav from "../components/LeftNav";
import Log from "../components/Log";

const Favorites = () => {
  const uid = useContext(UidContext);
  return (
    <div>
      {!uid ? (
        // <Navigate to="/profil" />
        <div className="log-container">
          <Log signin={true} signup={false} />
          <div className="img-container">
            <img src="./img/logo_secondary.svg" alt="img-log" />
          </div>
        </div>
      ) : (
        <div className="favorites">
          <LeftNav /> <p>hello favori</p> favori
        </div>
      )}
    </div>
  );
};

export default Favorites;
