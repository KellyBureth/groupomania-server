import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrends } from "../actions/post.actions";
import { isEmpty } from "./Utils";
import { NavLink } from "react-router-dom";

const Trends = () => {
  const posts = useSelector((state) => state.allPostsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPostsReducer); //dispatch envoe, useSelector recupere !!!
  console.log("allpost", allPosts);
  const userData = useSelector((state) => state.userReducer);
  const userId = userData._id;
  console.log("userid", userId);
  console.log("allpostid", allPosts.posterId);
  console.log("allpostid", allPosts.likers);
  //   useEffect(() => {
  //     if (!isEmpty(posts[0])) {
  //       const postsArr = allPosts.filter((truc) => truc.likers.includes(userId));
  //       postsArr.length = 3; //on ne prend que les 3 posts les plus aimés
  //       dispatch(getTrends(postsArr));
  //     }
  //   }, [posts, dispatch]);
  const postsArr = allPosts.filter((truc) => truc.likers.includes(userId));
  return (
    <div className="trending-container">
      <h4>Mes posts favoris</h4>
      <NavLink to="/trending">
        <ul>
          {allPosts.length &&
            allPosts.map((post) => {
              return (
                <li key={post._id}>
                  <div>
                    {/* {post.picture && <img src={post.picture} alt="post-pic" />}
                    {post.video && (
                      <iframe
                        src={post.video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={post._id}
                      ></iframe>
                    )} */}
                    {/* {isEmpty(post.picture) && isEmpty(post.video) && ( */}
                    <img
                      src={
                        usersData[0] &&
                        usersData
                          .map((user) => {
                            if (user._id === allPosts.posterId) {
                              return user.picture;
                            } else return null;
                          })
                          .join("")
                      }
                      alt="profil-pic"
                    />
                    {/* )} */}
                  </div>
                  <div className="trend-content">
                    <p>{post.message}</p>
                    <p>
                      {" "}
                      {!post.message && (
                        <img src={post.picture} alt="post-pic" />
                      )}
                    </p>
                    <span>Lire</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </NavLink>
    </div>
  );
};

export default Trends;
