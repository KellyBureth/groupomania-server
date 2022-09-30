import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Card from "../components/Post/Card";
// import Trends from "../components/Trends";
// import { Navigate } from "react-router-dom";
import Log from "../components/Log";
import { getTrends } from "../actions/post.actions";
import { isEmpty } from "../components/Utils";
// import { NavLink } from "react-router-dom";

const Trending = () => {
  const uid = useContext(UidContext);
  const posts = useSelector((state) => state.allPostsReducer);
  // const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]); //pour faire un sort sur le  nb e like
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 15; //on ne prend que les 3 posts les plus aimés
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);
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
        <div className="trending-page">
          <LeftNav />
          <div className="main">
            <h1 className="title_trending">En tendance</h1>
            <ul>
              {!isEmpty(trendList[0]) &&
                trendList.map((post) => <Card post={post} key={post._id} />)}
            </ul>
          </div>
          {/* <div className="right-side"> */}
          {/* <div className="right-side-container"> */}
          {/* <Trends /> */}
          {/* {uid && <FriendsHint />} */}
          {/* </div> */}
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default Trending;
// import React, { useContext } from "react";
// import { useSelector } from "react-redux";
// import { UidContext } from "../components/AppContext";
// import LeftNav from "../components/LeftNav";
// import { isEmpty } from "../components/Utils";
// import Card from "../components/Post/Card";
// import Trends from "../components/Trends";
// // import { Navigate } from "react-router-dom";
// import Log from "../components/Log";

// const Trending = () => {
//   const uid = useContext(UidContext);
//   const trendList = useSelector((state) => state.trendingReducer);

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
//             <ul>
//               {!isEmpty(trendList[0]) &&
//                 trendList.map((post) => <Card post={post} key={post._id} />)}
//             </ul>
//           </div>
//           <div className="right-side">
//             <div className="right-side-container">
//               <Trends />
//               {/* {uid && <FriendsHint />} */}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Trending;
