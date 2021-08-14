import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/auth-context";

import "./Header.css";

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <nav
      style={{ backgroundColor: authCtx.adminLoggedIn ? "#355070" : "#b56576" }}
      className="navbar navbar-expand-lg navbar-dark "
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="Review Me"
          />
        </NavLink>

        <button
          className="navbar-toggler navbar-toggler-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarBar"
          aria-controls="navbarBar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarBar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!authCtx.adminLoggedIn && (
              <li className="nav-item">
                <NavLink id="head-link" className="nav-link" to="/wish-list">
                  Wish List
                </NavLink>
              </li>
            )}
            {!authCtx.adminLoggedIn && (
              <li className="nav-item">
                <NavLink id="head-link" className="nav-link" to="/library">
                  Library
                </NavLink>
              </li>
            )}
            {authCtx.adminLoggedIn && authCtx.isLoggedIn && (
              <li className="nav-item">
                <NavLink id="head-link" className="nav-link" to="/report-admin">
                  Reports
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {authCtx.adminLoggedIn && (
              <li className="nav-item">
                <NavLink id="head-link" className="nav-link" to="/signupadmin">
                  Add Admin
                </NavLink>
              </li>
            )}
            {!authCtx.isLoggedIn && (
              <li className="nav-item">
                <NavLink id="head-link" className="nav-link" to="/login">
                  Log In
                </NavLink>
              </li>
            )}
            {!authCtx.isLoggedIn && (
              <li className="nav-item">
                <NavLink id="head-link" className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li className="nav-item">
                <NavLink id="head-link" className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li
                className="nav-item logoutButton"
                style={{
                  backgroundColor: authCtx.adminLoggedIn
                    ? "#355070"
                    : "#b56576",
                }}
                onClick={authCtx.logout}
              >
                <NavLink id="head-link" className="nav-link" to="/homepage">
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
