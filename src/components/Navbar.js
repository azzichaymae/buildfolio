import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token") || null;

  return (
    <nav className="bg-purple-600 fixed   top-0 left-0 right-0  ">
      <div className="max-w-full sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center space-x-2 text-white font-semibold text-lg">
            <NavLink to="/">
              <img className="w-10 h-10 rounded" src="buildFolio.png" alt="Buildfolio Logo" />
            </NavLink>
            <span className="font-bold">Buildfolio</span>
          </div>
          <div className="flex space-x-6 text-white font-semibold text-base">
            <NavLink to="/" className="hover:text-purple-200 transition-colors">
              Home
            </NavLink>
            <NavLink to={token ? "/dashboard" : "/login"} className="hover:text-purple-200 transition-colors">
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;