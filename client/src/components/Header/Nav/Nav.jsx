import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return  <nav className="nav-bar">
    <Link to="/">Inicio</Link>
    <Link to="/client/dashboard">Perfil</Link>
    <Link to="/client/other">Mis recetas</Link>
    </nav>
};

export default Nav;
