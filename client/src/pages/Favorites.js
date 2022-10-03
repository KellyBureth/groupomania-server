import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Card from "../components/Post/Card";
import Log from "../components/Log";
import { isEmpty } from "../components/Utils";
import GoUp from "../components/GoUp";

const Favorites = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const allPosts = useSelector((state) => state.allPostsReducer);
  console.log("allpost", allPosts);
  const userId = userData._id;
  console.log("userid", userId);
  console.log("allpostid", allPosts.posterId);
  console.log("allpostid", allPosts.likers);

  return (
    <div id="top">
      {uid === "null" && console.log("wait uid")}
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
        <div className="favorites-page">
          <LeftNav />
          <GoUp />
          <div className="main">
            <h1 className="title_favorites">Vos posts préférés</h1>
            <ul>
              {!isEmpty(allPosts[0]) &&
                allPosts
                  .filter((key) => key.likers.includes(userId))
                  .map((likedPosts) => {
                    return <Card post={likedPosts} key={likedPosts._id} />;
                  })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
