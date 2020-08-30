import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "./../auth/helper/index";
import { Link } from "react-router-dom";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";
import { ToastContainer, toast } from "react-toastify";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(user._id, token, categoryId).then((data) => {
      if (data.error) {
        toast.error(data.error, { position: "top-center" });
      } else {
        toast.info("Category deleted successfully");
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage categories here">
      <Link className="btn btn-info mb-2" to="/admin/dashboard">
        <span className="">Admin Home</span>
      </Link>
      <h3 className="mb-4">
        <u> All Categories: </u>
      </h3>
      <div className="row">
        <div className="col-12">
          {categories.map((category, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{category.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          <h4 className="text-center text-white my-3">{`Total ${categories.length} categories`}</h4>
        </div>
      </div>
      <ToastContainer hideProgressBar={true} position="top-center" />
    </Base>
  );
};

export default ManageCategories;
