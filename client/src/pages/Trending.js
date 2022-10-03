import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Card from "../components/Post/Card";
import Log from "../components/Log";
import { getTrends } from "../actions/post.actions";
import { isEmpty } from "../components/Utils";
import GoUp from "../components/GoUp";

const Trending = () => {
  const uid = useContext(UidContext);
  const posts = useSelector((state) => state.allPostsReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 15;
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);
  return (
    <div id="top">
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
        <div className="trending-page">
          <LeftNav />
          <GoUp />
          <div className="main">
            <h1 className="title_trending">En tendance</h1>
            <ul>
              {!isEmpty(trendList[0]) &&
                trendList.map((post) => <Card post={post} key={post._id} />)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trending;
