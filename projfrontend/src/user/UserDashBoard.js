import React from "react";
import Base from "../core/Base";
import { ToastContainer } from "react-toastify";

export default function UserDashboard() {
  return (
    <Base title="Your Dashboard" description="">
      <ToastContainer hideProgressBar={true} />
      <h1>UserDashboard</h1>
    </Base>
  );
}
