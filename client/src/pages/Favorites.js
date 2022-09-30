// import React, { useContext } from "react";
// import { UidContext } from "../components/AppContext";
// // import { Navigate } from "react-router-dom";
// import LeftNav from "../components/LeftNav";
// import Log from "../components/Log";
// import React, { useEffect,  } from "react";
import React, { useContext } from "react";
// import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Card from "../components/Post/Card";
// import Trends from "../components/Trends";
// import { Navigate } from "react-router-dom";
import Log from "../components/Log";
// import { getTrends } from "../actions/post.actions";
import { isEmpty } from "../components/Utils";
// import { NavLink } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import { getPosts } from "../actions/post.actions";
// import Card from "./Post/Card";
// import { isEmpty } from "./Utils";

const Favorites = () => {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.userReducer);
  // const [loadPost, setLoadPost] = useState(true); //chargement de l'ensemble des posts, de base sur true car on veut charger les posts quand on appelle le componants thread
  // const [count, setCount] = useState(5); //5 posts de base
  // const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer); //dispatch envoe, useSelector recupere !!!
  const allPosts = useSelector((state) => state.allPostsReducer); //dispatch envoe, useSelector recupere !!!
  console.log("allpost", allPosts);
  const userId = userData._id;
  console.log("userid", userId);
  console.log("allpostid", allPosts.posterId);
  console.log("allpostid", allPosts.likers);

  //const postsArr = Object.keys(allPosts).map((i) => allPosts[i]);
  // let filteredArray = Object.keys(
  //   allPosts.filter((key) => userId.includes(key))
  //   // .reduce((obj, key) => {
  //   //   obj[key] = allPosts[key];
  //   //   return obj;
  //   // })
  // );
  // const filteredArray = allPosts.filter((truc) =>
  //   truc.posterId.includes(userId)
  // );
  // console.log("filteredArray", filteredArray);
  const favoritesPosts = allPosts.filter((truc) =>
    truc.likers.includes(userId)
  );
  console.log("favoritesPosts", favoritesPosts);

  // let favoritesPosts;
  // if (allPosts) {
  //   favoritesPosts = allPosts.filter((truc) => truc.likers.includes(userId));
  // }
  // const allPostsReverse = allPosts.reverse();

  // const arrLikers = posts.likers;

  // for (let post of posts) {
  //   if (post.likers.includes(userData._id)) {
  //   }
  // }

  // //filtrer les posts liké
  // !isEmpty(posts) &&
  //   arrLikers
  //     .filter((likers) => likers.includes(userData._id))
  //     .map((post) => {
  //       return <Card post={post} key={post._id} />;
  //     });
  // const loadMore = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop + 1 >
  //     document.scrollingElement.scrollHeight
  //   ) {
  //     setLoadPost(true);
  //   }
  // };

  // useEffect(() => {
  //   if (loadPost) {
  //     //si loadpost true, donc au chargement de la page
  //     dispatch(getPosts(count)); //envoie données dans store
  //     setLoadPost(false); //loadpost se met sur false pour ne plus charger davantage de posts
  //     setCount(count + 5); //ajoute 5 posts
  //   }

  //   window.addEventListener("scroll", loadMore); //a chaque scroll, analyse loadMore pour savoir ou on se trouve sur la page, t lancer la fonction loadmore qui ajoutera 5 posts si on est en bas de page
  //   return () => window.removeEventListener("scroll", loadMore); //puis stoppe l'ecoute une fois qu'on n'est plus en bas de la page
  // }, [loadPost, dispatch, count]);

  const isLiked = false;
  for (let post of allPosts) {
    if (post.likers === userData._id) {
      isLiked = true;
    }
  }

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
          <LeftNav />
          <div className="main">
            <h1 className="title_favorites">Vos posts préférés</h1>
            <ul>
              {!isEmpty(allPosts) &&
                favoritesPosts.map((favoritesPosts) => {
                  return (
                    <Card post={favoritesPosts} key={favoritesPosts._id} />
                  );
                })}
              {/* {!isEmpty(posts) &&
                posts.map((post) => {
                  return <Card post={post} key={post._id} />;
                })} */}
              {/* {!isEmpty(allPosts) &&
                allPosts
                  .filter((post) => (post.likers = userData._id))
                  .map((postsLiked) => <li>{postsLiked.message}</li>)} */}
              {/* {!isEmpty(posts) &&
                posts
                  .filter((post) => (post.likers = userData._id))
                  .map((post) => {
                    return <Card post={post} key={post._id} />;
                  })} */}
              {/* {!isEmpty(posts) &&
                arrLikers
                  .filter((likers) => likers.includes(userData._id))
                  .map((post) => {
                    return <Card post={post} key={post._id} />;
                  })} */}
              {/* {!isEmpty(posts) &&
                posts.map((post) => {
                  return <Card post={post} key={post._id} />;
                })} */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;

// import React, { useContext, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { UidContext } from "../components/AppContext";
// import LeftNav from "../components/LeftNav";
// import Card from "../components/Post/Card";
// // import Trends from "../components/Trends";
// // import { Navigate } from "react-router-dom";
// import Log from "../components/Log";
// import { getTrends } from "../actions/post.actions";
// import { isEmpty } from "../components/Utils";
// // import { NavLink } from "react-router-dom";

// const Trending = () => {
//   const uid = useContext(UidContext);
//   const posts = useSelector((state) => state.allPostsReducer);
//   // const usersData = useSelector((state) => state.usersReducer);
//   const trendList = useSelector((state) => state.trendingReducer);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!isEmpty(posts[0])) {
//       const postsArr = Object.keys(posts).map((i) => posts[i]); //pour faire un sort sur le  nb e like
//       let sortedArray = postsArr.sort((a, b) => {
//         return b.likers.length - a.likers.length;
//       });
//       sortedArray.length = 15; //on ne prend que les 3 posts les plus aimés
//       dispatch(getTrends(sortedArray));
//     }
//   }, [posts, dispatch]);
//   return (
//     <div>
//       {!uid ? (
//         // <Navigate to="/profil" />
//         <div className="log-container">
//           <Log signin={true} signup={false} />
//           <div className="img-container">
//             <img src="./img/logo_secondary.svg" alt="img-log" />
//           </div>
//         </div>
//       ) : (
//         <div className="trending-page">
//           <LeftNav />
//           <div className="main">
//             <h1 className="title_trending">En tendance</h1>
//             <ul>
//               {!isEmpty(trendList[0]) &&
//                 trendList.map((post) => <Card post={post} key={post._id} />)}
//             </ul>
//           </div>
//           {/* <div className="right-side"> */}
//           {/* <div className="right-side-container"> */}
//           {/* <Trends /> */}
//           {/* {uid && <FriendsHint />} */}
//           {/* </div> */}
//           {/* </div> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Trending;
// // import React, { useContext } from "react";
// // import { UidContext } from "../components/AppContext";
// // // import { Navigate } from "react-router-dom";
// // import LeftNav from "../components/LeftNav";
// // import Log from "../components/Log";

// import React, { useContext, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { UidContext } from "../components/AppContext";
// import LeftNav from "../components/LeftNav";
// import Card from "../components/Post/Card";
// // import Trends from "../components/Trends";
// // import { Navigate } from "react-router-dom";
// import Log from "../components/Log";
// import { getTrends } from "../actions/post.actions";
// import { isEmpty } from "../components/Utils";
// // import { NavLink } from "react-router-dom";

// const Favorites = () => {
//   const uid = useContext(UidContext);
//   const posts = useSelector((state) => state.allPostsReducer);
//   // const usersData = useSelector((state) => state.usersReducer);
//   const trendList = useSelector((state) => state.trendingReducer);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!isEmpty(posts[0])) {
//       const postsArr = Object.keys(posts).map((i) => posts[i]); //pour faire un sort sur le  nb e like
//       let sortedArray = postsArr.sort((a, b) => {
//         return b.likers.length - a.likers.length;
//       });
//       sortedArray.length = 15; //on ne prend que les 3 posts les plus aimés
//       dispatch(getTrends(sortedArray));
//     }
//   }, [posts, dispatch]);

//   return (
//     <div>
//       {!uid ? (
//         // <Navigate to="/profil" />
//         <div className="log-container">
//           <Log signin={true} signup={false} />
//           <div className="img-container">
//             <img src="./img/logo_secondary.svg" alt="img-log" />
//           </div>
//         </div>
//       ) : (
//         <div className="favorites">
//           <LeftNav />
//           <div className="main">
//             <h1 className="title_trending">Vos posts préférés</h1>
//             <ul>
//               {!isEmpty(trendList[0]) &&
//                 trendList.map((post) => <Card post={post} key={post._id} />)}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favorites;

// // import React, { useContext, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { UidContext } from "../components/AppContext";
// // import LeftNav from "../components/LeftNav";
// // import Card from "../components/Post/Card";
// // // import Trends from "../components/Trends";
// // // import { Navigate } from "react-router-dom";
// // import Log from "../components/Log";
// // import { getTrends } from "../actions/post.actions";
// // import { isEmpty } from "../components/Utils";
// // // import { NavLink } from "react-router-dom";

// // const Trending = () => {
// //   const uid = useContext(UidContext);
// //   const posts = useSelector((state) => state.allPostsReducer);
// //   // const usersData = useSelector((state) => state.usersReducer);
// //   const trendList = useSelector((state) => state.trendingReducer);
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     if (!isEmpty(posts[0])) {
// //       const postsArr = Object.keys(posts).map((i) => posts[i]); //pour faire un sort sur le  nb e like
// //       let sortedArray = postsArr.sort((a, b) => {
// //         return b.likers.length - a.likers.length;
// //       });
// //       sortedArray.length = 15; //on ne prend que les 3 posts les plus aimés
// //       dispatch(getTrends(sortedArray));
// //     }
// //   }, [posts, dispatch]);
// //   return (
// //     <div>
// //       {!uid ? (
// //         // <Navigate to="/profil" />
// //         <div className="log-container">
// //           <Log signin={true} signup={false} />
// //           <div className="img-container">
// //             <img src="./img/logo_secondary.svg" alt="img-log" />
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="trending-page">
// //           <LeftNav />
// //           <div className="main">
// //             <h1 className="title_trending">En tendance</h1>
// //             <ul>
// //               {!isEmpty(trendList[0]) &&
// //                 trendList.map((post) => <Card post={post} key={post._id} />)}
// //             </ul>
// //           </div>
// //           {/* <div className="right-side"> */}
// //           {/* <div className="right-side-container"> */}
// //           {/* <Trends /> */}
// //           {/* {uid && <FriendsHint />} */}
// //           {/* </div> */}
// //           {/* </div> */}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Trending;
