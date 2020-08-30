import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories, CreateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
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
    createdProduct: "",
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
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  }, []);

  const addProductForm = () => (
    <form>
      {goBack()}
      <p className="lead">Add New Product:</p>
      <div className="form-group">
        <span>Select Photo:</span>
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
        Create Product
      </button>
    </form>
  );

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    CreateProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        toast.error(data.error, { position: "top-center" });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          formData: "",
          createdProduct: data.name,
        });
        toast.success("Product added successfully", { position: "top-center" });
      }
    });
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
      title="Add Product"
      description="Add new Products here"
      className="container bg-info p-4 rounded"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">{addProductForm()}</div>
      </div>
      <ToastContainer hideProgressBar={true} position="top-center" />
    </Base>
  );
};

export default AddProduct;
