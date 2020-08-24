import React from "react";
import Base from "../core/Base";
import { ToastContainer } from "react-toastify";
import { isAuthenticated } from "./../auth/helper/index";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h6 className="card-header bg-dark text-white">Admin Navigation</h6>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-info">
              Add Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-info">
              Add Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-info">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-info">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card">
        <h6 className="card-header">Admin Information</h6>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">You are Admin</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome, Admin"
      description="Manage your products here"
      className="container p-4"
    >
      <ToastContainer hideProgressBar={true} />
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
}
