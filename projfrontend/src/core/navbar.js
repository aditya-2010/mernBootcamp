import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ToastContainer hideProgressBar={true} />
      <Link className="navbar-brand" to="/home">
        My Store
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart">
              Cart
            </NavLink>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/user/dashboard">
                Dashboard
              </NavLink>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/dashboard">
                Admin Dashboard
              </NavLink>
            </li>
          )}
          {!isAuthenticated() && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signin">
                  Sign In
                </NavLink>
              </li>
            </React.Fragment>
          )}

          {isAuthenticated() && (
            <li className="nav-item">
              <span
                className="nav-link text-warning"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  signout();
                  history.push("/home");
                }}
              >
                Signout
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
