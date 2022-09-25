import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftNav = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" activeclassname="active-left-nav">
            <br />
            <i className="fas fa-house"></i>
            <br />
            {/* <img src="./img/icons/home.svg" alt="home" /> */}
          </NavLink>
          <br />
          <NavLink to="/trending" activeclassname="active-left-nav">
            <br />
            <i className="fas fa-square-poll-vertical"></i>
            {/* <i class="fa-solid fa-crown"></i> */}
            <br />
            {/* <img src="./img/icons/rocket.svg" alt="home" /> */}
          </NavLink>
          <br />
          <NavLink to="/favorites" activeclassname="active-left-nav">
            <br />
            <i className="fa-solid fa-heart-circle-check"></i>
            <br />
          </NavLink>
          <br />
          <NavLink to="/profil" activeclassname="active-left-nav">
            <br />
            <i className="fa-solid fa-house-user"></i>
            <br />
            {/* <img src="./img/icons/user.svg" alt="home" /> */}
          </NavLink>
          {userData.role === "833" && (
            <NavLink to="/dashboard" activeclassname="active-left-nav">
              <br />
              <i className="fa-solid fa-unlock"></i>
              <br />
              {/* <img src="./img/icons/user.svg" alt="home" /> */}
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
