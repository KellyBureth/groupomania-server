import React, { useEffect, useState } from "react";
// import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const IsLoggedIn = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data); //recupere data
        })
        .catch((err) => console.log("No token"));
      // .catch((res) => res.redirect("/profil"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid)); //si uid existe, (uid etant la data recuperé dans setuid du fetchtoken) stocker les données dans le store
  }, [uid, dispatch]);

  //si fechtoken est null indeifined : loader , sinon
  return <div></div>;
};

export default IsLoggedIn;
