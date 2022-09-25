import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UidContext } from "../AppContext";
// import { accountService } from "../_services/account.service";

//fichier "gardien" pour fermer routes admin
const AuthGuard = ({ children }) => {
  const uid = useContext(UidContext);

  if (!uid) {
    return <Navigate to="/profil" />;
  }
  return children;
};

export default AuthGuard;
