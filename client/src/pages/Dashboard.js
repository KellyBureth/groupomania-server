import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LeftNav from "../components/LeftNav";
const Dashboard = () => {
  const userData = useSelector((state) => state.userReducer);
  const ADMIN = process.env.REACT_APP_API_ADMIN_ROLE;
  return (
    <div className="dash">
      {userData.role === ADMIN ? (
        <div className="dashboard">
          <LeftNav />
          admin dashboard
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default Dashboard;
