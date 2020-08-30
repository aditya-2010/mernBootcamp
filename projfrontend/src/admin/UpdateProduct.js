import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getAllCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    category: "",
    categories: [],
    loading: false,
    error: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    category,
    categories,
    loading,
    error,
    getaRedirect,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  useEffect(() => {
    const preloadCategories = () => {
      getAllCategories().then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            categories: data,
            formData: new FormData(),
          });
        }
      });
    };

    const preload = (productId) => {
      getProduct(productId).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          preloadCategories();

          setValues({
            ...values,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category._id,
            stock: data.stock,
            formData: new FormData(),
          });
        }
      });
    };

    preload(match.params.productId);
  }, []);

  const addProductForm = () => (
    <form>
      {goBack()}
      <div className="form-group">
        <p className="lead">Update Product:</p>
        <input
          className="form-control-file"
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image"
          // placeholder="choose a file"
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          onChange={handleChange("name")}
          value={name}
          placeholder="Name"
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          onChange={handleChange("description")}
          value={description}
          placeholder="Description"
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          onChange={handleChange("price")}
          type="number"
          value={price}
          placeholder="Price"
        />
      </div>
      <div className="form-group">
        <select onChange={handleChange("category")} className="form-control">
          <option>Select</option>
          {categories.map((cate, index) => (
            <option key={index} value={cate._id}>
              {cate.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          onChange={handleChange("stock")}
          type="number"
          value={stock}
          placeholder="Stock"
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-outline-info mb-3"
      >
        Update Product
      </button>
    </form>
  );

  const loadingMessage = () =>
    loading && (
      <div className="row">
        <div className="col-md-6 offset-md-3 text-left">
          <div className="alert alert-info">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(user._id, token, formData, match.params.productId).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          toast.error(data.error, { position: "top-center" });
        } else {
          setValues({
            ...values,
            loading: false,
          });
          toast.info(`Product updated successfully`, {
            position: "top-center",
          });
        }
      }
    );
  };

  const goBack = () => (
    <h4>
      <Link style={{ textDecoration: "none" }} to="/admin/dashboard">
        <i className="fa fa-chevron-circle-left" aria-hidden="true">
          {" "}
          Back
        </i>
      </Link>
    </h4>
  );

  return (
    <Base
      title="Update Product"
      description="Update Products here"
      className="container bg-info p-4 rounded"
    >
      {loadingMessage()}
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">{addProductForm()}</div>
      </div>
      <ToastContainer hideProgressBar={true} position="top-center" />
    </Base>
  );
};

export default UpdateProduct;
