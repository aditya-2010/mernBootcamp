import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = ({ history }) => {
  return (
    <nav className="navbar navbar-toggleable-md navbar-expand navbar-dark bg-dark">
      <ToastContainer hideProgressBar={true} position="top-center" />
      <Link className="navbar-brand" to="/home">
        The T-Shirt Store
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart">
              My Cart
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
            <li className="nav-item ml-auto">
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
