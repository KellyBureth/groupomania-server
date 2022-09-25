import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
// import { Navigate } from "react-router-dom";
import Log from "../components/Log";

const Trending = () => {
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
        <div className="trending">
          <LeftNav />
          tendance
        </div>
      )}
    </div>
  );
};

export default Trending;
