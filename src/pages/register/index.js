import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthHook } from "../../hooks/useauth"; 
import './register.css';

const Register = () => {
  const { registerHandler, error } = useAuthHook(); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 7) {
      setErrorMessage("Password must be at least 7 characters long.");
      return;
    }

    setErrorMessage("");

    try {
      await registerHandler(username, email, password); 

      if (!error) { 
        navigate("/");
      } else {
        setErrorMessage(error);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <img src="logo2.png" className="logo" width={100} height={100} alt="logo" />
        
        <label className="label" htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
          required
        />

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

        <label className="label" htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
          required
        />
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="button">Register</button>

        <div className="label">
          <span>Already have an account? </span>
          <Link to="/login" className="link">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
