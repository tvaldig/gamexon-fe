import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth} from "../../context/authcontext";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <img src="logo2.png" className="logo" width={200} height={200} alt="logo" />
      <nav>
        <ul>
          <li>
            <NavLink to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav-link" activeClassName="active">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
