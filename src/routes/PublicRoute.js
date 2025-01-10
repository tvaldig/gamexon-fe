import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
