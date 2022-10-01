// import React from "react";
import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
// import { Navigate } from "react-router-dom";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log";
import Trends from "../components/Trends";
import GoUp from "../components/GoUp";
// import FavoritesOverview from "../components/FavoritesOverview";
// import Log from "../components/Log";
// import Trends from "../components/Trends";
// import FriendsHint from "../components/Profil/FriendsHint";

const Home = () => {
  const uid = useContext(UidContext);
  console.log("uid", uid);
  return (
    <div id="top">
      {uid === "null" && console.log("wait uid null", uid)}
      {!uid ? (
        <div className="profil-page">
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
        </div>
      ) : (
        // <div className="log-container">
        //   <Log signin={true} signup={false} />
        //   <div className="img-container">
        //     <img src="./img/logo_secondary.svg" alt="img-log" />
        //   </div>
        //   {console.log("wait !uid ", uid)}
        // </div>
        // <Navigate to="/profil" />
        <div className="home">
          <LeftNav />
          <div className="main">
            {/* <div className="home-header">
        {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div> */}
            <div className="home-header">
              <NewPostForm />
            </div>
            <Thread />
            <GoUp />
          </div>
          <div className="right-side">
            <div className="right-side-container">
              <div className="wrapper">
                <Trends />
                {/* <FavoritesOverview /> */}
                {/* {uid && <FriendsHint />} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
