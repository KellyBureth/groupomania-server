import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import Card from "../Post/Card";
import { isEmpty } from "../Utils";

const UserPosts = () => {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.userReducer);
  const allPosts = useSelector((state) => state.allPostsReducer);
  console.log("allpost", allPosts);
  const userId = userData._id;
  console.log("userid", userId);
  console.log("allpostid", allPosts.posterId);
  console.log("allpostid", allPosts.likers);

  return (
    <div>
      {uid === "null" && console.log("wait uid")}
      {!uid ? (
        <div>{console.log("uid null")}</div>
      ) : (
        <div className="userPosts">
          <h1 className="titleAllPosts">Tous les posts de {userData.pseudo}</h1>
          {!isEmpty(allPosts) &&
            allPosts
              .filter((key) => key.posterId.includes(userId))
              .map((userPosts) => {
                return <Card post={userPosts} key={userPosts._id} />;
              })}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
