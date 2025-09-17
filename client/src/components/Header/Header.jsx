import React from "react";
import Nav from "./Nav/Nav";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../../services/userServices";

const Header = () => {

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("No se pudo cerrar sesión");
    }
  }; 

  return <header className="header">
    <h1>Recetas familiares</h1>
    <div>
    {/* {logged == true? 
    <Nav/>: */}
    <>
    <Link to='/register' className='register-link'>
      Register
    </Link>
    <Link to='/login' className='login-link'>
      Login
    </Link>
    <Link to='/' className='home-link'>
      Inicio
    </Link>
    <button onClick={handleLogout}>Logout</button>
     </>{/*} */}
    </div> 
  </header>;
};

export default Header;
