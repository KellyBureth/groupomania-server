import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true); //chargement de l'ensemble des posts, de base sur true car on veut charger les posts quand on appelle le componants thread
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  const allPosts = useSelector((state) => state.allPostsReducer);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      //si loadpost true, donc au chargement de la page
      dispatch(getPosts(count)); //envoie données dans store
      setLoadPost(false); //loadpost se met sur false pour ne plus charger davantage de posts
      setCount(count + 5); //ajoute 5 posts
    }

    window.addEventListener("scroll", loadMore); //à chaque scroll, analyse loadMore pour savoir ou on se trouve sur la page, et lancer la fonction loadmore qui ajoutera 5 posts si on est en bas de page
    return () => window.removeEventListener("scroll", loadMore); //puis stoppe l'ecoute une fois qu'on n'est plus en bas de la page
  }, [loadPost, dispatch, count]);

  return (
    <div className="thread-container">
      {" "}
      <ul>
        <input
          type="checkbox"
          defaultChecked={true}
          name="admin_postsOrder"
          id="admin_postsOrder"
        />{" "}
        <div className="chronologique">
          <label htmlFor="admin_postsOrder">
            <i className="fa-solid fa-sort"></i> Afficher les posts du plus
            ancien au plus récent
          </label>{" "}
          {!isEmpty(posts) &&
            posts.map((post) => {
              return <Card post={post} key={post._id} />;
            })}
        </div>
        <div className="antichronologique">
          <label htmlFor="admin_postsOrder">
            <i className="fa-solid fa-sort"></i> Afficher les posts du plus
            récent au plus ancien
          </label>{" "}
          {!isEmpty(allPosts[0]) &&
            allPosts
              .map((post) => {
                return <Card post={post} key={post._id} />;
              })
              .reverse()}
        </div>
      </ul>
    </div>
  );
};

export default Thread;
