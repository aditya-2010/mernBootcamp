import React, { useState } from "react";
import Base from "./../core/Base";
import { isAuthenticated } from "./../auth/helper/index";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { token, user } = isAuthenticated();

  const goBack = () => (
    <h5>
      <Link style={{ textDecoration: "none" }} to="/admin/categories">
        <i className="fa fa-chevron-circle-left" aria-hidden="true">
          {" "}
          Back
        </i>
      </Link>
    </h5>
  );

  const handleChange = (e) => {
    setName(e.target.value);
    // setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // backend request
    updateCategory(user._id, token, { name }, match.params.categoryId).then(
      (data) => {
        if (data.error) {
          setError(true);
          toast.error(data.error);
        } else {
          setName("");
          setError("");
          setSuccess(true);
          toast.info("Category updated successfully", {
            position: "top-center",
          });
        }
      }
    );
  };

  const catForm = () => (
    <form>
      <div className="form-group">
        {goBack()}
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          placeholder="Eg. Summer"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
        <button className="btn btn-outline-info" onClick={handleSubmit}>
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Admin Panel"
      description="Add Categories here"
      className="container bg-info p-3"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-2">{catForm()}</div>
      </div>
      <ToastContainer hideProgressBar={true} position="top-center" />
    </Base>
  );
};

export default UpdateCategory;
