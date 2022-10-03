import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Trends = () => {
  const usersData = useSelector((state) => state.usersReducer);
  const allPosts = useSelector((state) => state.allPostsReducer);
  console.log("allpost", allPosts);
  const userData = useSelector((state) => state.userReducer);
  const userId = userData._id;
  console.log("userid", userId);
  console.log("allpostid", allPosts.posterId);
  console.log("allpostid", allPosts.likers);

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
