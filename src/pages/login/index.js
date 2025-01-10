import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthHook } from "../../hooks/useauth";
import './login.css';

const Login = () => {
  const { loginHandler, error } = useAuthHook();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setErrorMessage(""); 

    try {
      await loginHandler(email, password);

      if (!error) {

        navigate("/");
      } else {
        setErrorMessage(error);
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <img src="logo2.png" className="logo" width={150} height={150} alt="logo" />
        <label className="label" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <label className="label" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        {/* Display error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Error handling */}

         {/* Forgot Password Link */}
         <div className="label">
          <Link to="/forgot-password" className="link">Forgot Password?</Link>
        </div>

        <button type="submit" className="button">Login</button>

        {/* Don't have an account? Sign up link */}
        <div className="label">
          <span>Don't have an account? </span>
          <Link to="/register" className="link">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
