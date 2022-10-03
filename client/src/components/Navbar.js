import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

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
        <div className="nav-container">
          <div className="logo">
            <NavLink to="/">
              <div className="logo">
                <img src="./img/logo_brown.svg" alt="icon" />
                <h3>Groupomania</h3>
              </div>
            </NavLink>
          </div>
          {uid ? (
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
          ) : null}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
