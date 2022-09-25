// import React from "react";
import Cookie from "js-cookie";

const IsLogged = (cookiename) => {
  return Cookie.get(cookiename);
};

export default IsLogged;

// import { Navigate } from "react-router-dom";
// {!uid ? (
//     // <Navigate to="/profil" />
//     <p>hello</p>
//   ) : (
//   )}
