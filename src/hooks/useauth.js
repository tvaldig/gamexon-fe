import { useState } from 'react';
import { loginUser, registerUser } from '../api/auth';
import { useAuth } from '../context/authcontext';

export const useAuthHook = () => {
  const { login, logout } = useAuth();
  const [error, setError] = useState(null);

  const loginHandler = async (email, password) => {
    try {
      const userData = await loginUser(email, password);
      if (userData.token) {
        localStorage.setItem("idToken", userData.token);
        login(userData.token);
        setError(null); 
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError('Failed to login. Please try again later.');
    }
  };

  const registerHandler = async (username, email, password) => {
    try {
      const userData = await registerUser(username, email, password);
      if (userData.token) {
        localStorage.setItem("idToken", userData.token);
        login(userData.token); 
        setError(null);  
      } else {
        setError("Failed to register. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return { loginHandler, registerHandler, error, logout };
};
