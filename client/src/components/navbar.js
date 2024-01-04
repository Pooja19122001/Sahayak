import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import '../Styles/navbar.css';
import logo from '../images/helping-hand.png';

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/register");
  };
  return (
    <div className="navbar">
      <h2>Sahayak</h2>
      <img className= "image" src={logo} alt="Proj logo"/>
      <Link to="/">Home</Link>
      <Link to="/user">User</Link>
      <Link to="/helper">Helper</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login</Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
    </div>
  );
};
