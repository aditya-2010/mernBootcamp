import React from "react";
import Form from "../core/form";
import Joi from "joi-browser";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Signup extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().min(3).required().label("Name"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().min(6).max(15).required().label("Password"),
  };

  doSubmit = (data) => {
    signup(data).then(() => {
      const data = { name: "", email: "", password: "" };
      this.setState({ data });
    });
  };

  render() {
    return (
      <Base title="Signup" description="It's Free!">
        <ToastContainer />

        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Signup")}
            </form>
          </div>
        </div>
      </Base>
    );
  }
}

export default Signup;
