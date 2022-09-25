import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
// import { Navigate } from "react-router-dom";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  // const url = window.location.href;
  // const redirectConnexion = () => {
  //   if ((window.location = "http://localhost:3000/favorite")) {
  //     <p>coucou profil pas de reload </p>;
  //     console.log("pas reload");
  //   } else {
  //     <p>reload profil</p>;
  //     console.log("reload");
  //   }
  // };
  return (
    <nav>
      {!uid ? (
        <div className="nav-container">
          <div className="logo">
            <img src="./img/logo_brown.svg" alt="icon" />
            <h3>Groupomania</h3>
          </div>
        </div>
      ) : (
        // redirectConnexion()
        // <Navigate to="/profil" />
        <div className="nav-container">
          <div className="logo">
            <NavLink to="/">
              <div className="logo">
                <img src="./img/logo_brown.svg" alt="icon" />
                <h3>Groupomania</h3>
              </div>
            </NavLink>
          </div>
          {
            uid ? (
              <ul>
                <li></li>
                <li className="welcome">
                  <NavLink to="/profil">
                    <h5>
                      <p>Bonjour {userData.pseudo} !</p>
                      <img src={userData.picture} alt="" />
                    </h5>
                  </NavLink>
                </li>
                <Logout />
              </ul>
            ) : null //si pas connecté, aucune icone de porte, ce cas ne sera présent qu'en page de connexion car s'il n'y a pas de cookie, l'user sera redirigé
            // <ul>
            //   <li></li>
            //   <li>
            //     <NavLink to="/profil">
            //       <img src="./img/icons/login.svg" alt="login" />
            //     </NavLink>
            //   </li>
            // </ul>
          }
        </div>
      )}
    </nav>
  );
};

export default Navbar;
