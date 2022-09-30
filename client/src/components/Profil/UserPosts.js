import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../AppContext";
// import LeftNav from "../components/LeftNav";
import Card from "../Post/Card";
import Log from "../Log";
import { isEmpty } from "../Utils";

const UserPosts = () => {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.userReducer);
  // const [loadPost, setLoadPost] = useState(true); //chargement de l'ensemble des posts, de base sur true car on veut charger les posts quand on appelle le componants thread
  // const [count, setCount] = useState(5); //5 posts de base
  // const dispatch = useDispatch();
  // const posts = useSelector((state) => state.postReducer); //dispatch envoe, useSelector recupere !!!
  const allPosts = useSelector((state) => state.allPostsReducer); //dispatch envoe, useSelector recupere !!!
  console.log("allpost", allPosts);
  const userId = userData._id;
  console.log("userid", userId);
  console.log("allpostid", allPosts.posterId);
  console.log("allpostid", allPosts.likers);

  //   const userPosts = allPosts.filter((key) => key.posterId.includes(userId));
  // console.log("filteredArray", filteredArray);
  //   const userPosts = allPosts.filter((key) => key.likers.includes(userId));
  //   console.log("userPosts", userPosts);

  return (
    // <div>
    //   {" "}
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
    // <li className="card-container" key={userPosts._id}>
    //   {isLoading ? (
    //     <i className="fas fa-spinner fa-spin"></i>
    //   ) : (
    //     <>
    //       <div className="card-left">
    //         <img
    //           src={
    //             !isEmpty(usersData[0]) &&
    //             usersData
    //               .map((user) => {
    //                 if (user._id === userPosts.posterId) return user.picture;
    //                 else return null;
    //               })
    //               .join("") //pour ne pas avoir de virgule entre chaque element
    //           }
    //           alt="poster-pic"
    //         />
    //       </div>
    //       <div className="card-right">
    //         <div className="card-header">
    //           <div className="pseudo">
    //             <h3>
    //               {!isEmpty(usersData[0]) &&
    //                 usersData
    //                   .map((user) => {
    //                     if (user._id === userPosts.posterId) return user.pseudo;
    //                     else return null;
    //                   })
    //                   .join("")}
    //             </h3>
    //             {/* {post.posterId !== userData._id && (
    //               <FollowHandler idToFollow={post.posterId} type={"card"} />
    //             )} */}
    //           </div>
    //           <span>{dateParser(userPosts.createdAt)}</span>
    //         </div>
    //         {isUpdated === false && <p>{userPosts.message}</p>}
    //         {isUpdated && (
    //           <div className="update-post">
    //             <textarea
    //               defaultValue={userPosts.message}
    //               onChange={(e) => setTextUpdate(e.target.value)}
    //             />
    //             {/* essai edit img */}
    //             <div className="icon">
    //               <>
    //                 <label htmlFor="file-upload">
    //                   <i className="fa-regular fa-image"></i>
    //                 </label>
    //                 <input
    //                   type="file"
    //                   id="file-upload"
    //                   name="file"
    //                   accept=".jpg, .jpeg, .png"
    //                   // onChange={(e) => handlePicture(e)}
    //                   onChange={(e) => setFile(e.target.files[0])}
    //                 />
    //               </>
    //             </div>
    //             <div className="button-container">
    //               {/* <button className="btn" onClick={handlePost}> */}
    //               <button className="btn" onClick={updateItemData}>
    //                 Valider les modifications
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //         {userPosts.picture && (
    //           <img src={userPosts.picture} alt="card-pic" className="card-pic" />
    //         )}

    //         {/* {post.video && (
    //           <iframe
    //             width="500"
    //             height="300"
    //             src={post.video}
    //             frameBorder="0"
    //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //             allowFullScreen
    //             title={post._id}
    //           ></iframe>
    //         )} */}

    //         {/* {userData._id === post.posterId && ( */}
    //         <div className="button-container">
    //           {(userData._id === userPosts.posterId || userData.role === ADMIN) && (
    //             <div className="editDelete">
    //               <div
    //                 className="edit"
    //                 onClick={() => setIsUpdated(!isUpdated)}
    //               >
    //                 <div className="edit_text">Editer le post ? </div>

    //                 <div className="edit_icon">
    //                   <img
    //                     src="./img/icons/edit-post-brown.svg"
    //                     alt="edit a post"
    //                     className="i_post_edit"
    //                   />
    //                 </div>
    //               </div>
    //               <DeleteCard id={userPosts._id} />
    //             </div>
    //           )}
    //           <LikeButton userPosts={userPosts} />
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </li>
    //     </div>
    //   )}
    // </div>
  );
};

export default UserPosts;

// import React from "react";
// import { useSelector } from "react-redux";
// import Card from "../Post/Card";
// import { isEmpty } from "../Utils";

// const UserPosts = () => {
//   const userData = useSelector((state) => state.userReducer);

//   const allPosts = useSelector((state) => state.allPostsReducer); //dispatch envoe, useSelector recupere !!!
//   const allPosterId = allPosts[1].posterId;
//   const filter = allPosts.filter((post) => post.posterId.length > 1);
//   console.log("filter", filter);
//   console.log("allpost", allPosts);
//   console.log("allPosterId", allPosterId);
//   return (
//     <div>
//       <p>hey {userData._id}</p>
//       <p>Bonjour {userData.pseudo} !</p>
//       {/* {!isEmpty(allPosts) &&
//         allPosts.map((post) => {
//           return <Card post={post} key={post._id} />;
//         })} */}
//     </div>
//   );
// };

// export default UserPosts;
