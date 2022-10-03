import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log";
import Trends from "../components/Trends";
import GoUp from "../components/GoUp";

const Home = () => {
  const uid = useContext(UidContext);
  console.log("uid", uid);
  return (
    <div id="top">
      {uid === "null" && console.log("wait uid null", uid)}
      {!uid ? (
        <div className="profil-page">
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
        </div>
      ) : (
        <div className="home">
          <LeftNav />
          <div className="main">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
