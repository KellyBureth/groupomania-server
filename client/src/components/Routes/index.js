import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Conditions from "../../pages/Conditions";
import Dashboard from "../../pages/Dashboard";
import Favorites from "../../pages/Favorites";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Navbar from "../Navbar";

const index = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default index;
