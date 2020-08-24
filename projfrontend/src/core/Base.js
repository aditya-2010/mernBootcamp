import React from "react";
import NavBar from "./navbar";

const Base = ({
  title = "Welcome",
  description = "Welcome to my TShirt Store",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>

        <div className={className}>{children}</div>
      </div>

      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-info text-white text-center py-3">
          <h5>If you got any questions, feel free to reach out!</h5>
          <button className="btn btn-warning btn-md">Contact Us</button>
        </div>

        <div className="container text-center">
          <span className="text-muted">Created by: Aditya Nakadi</span>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Base;
