import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import '../Styles/auth.css';

export const Auth = () => {
  return (
    <div className="auth">
      <UserLogin />
      <HelperLogin />
    </div>
  );
};

const UserLogin = () => {

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3000/auth/userlogin", 
      {
        email,
        password,
      });

      setCookies("access_token", result.data.token);
      var ans= window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Username or password is incorrect")
    }
  };

  return (
    <div className="auth-container">
    <div>
      <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>UserLogin</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="Login" type="submit">Login</button>
      </form>
    </div>
    </div>
    </div>
  );
};

const HelperLogin = () => {

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3000/auth/helperlogin", 
      {
        email,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Username or password is incorrect")
    }
  };

  return (
    <div className="auth-container">
    <div>
      <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>HelperLogin</h2>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="Login" type="submit">Login</button>
      </form>
    </div>
    </div>
    </div>
  );
};