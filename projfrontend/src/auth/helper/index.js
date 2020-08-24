import { API } from "../../backend";
import { toast } from "react-toastify";

export const signup = (user) => {
  return fetch(`${API}signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => toast.success(`Signup successful`)) // response returns user id, name, email
    .catch((err) => toast.error(`Signup failed`)); // use sentry
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => response.json());
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
  next();
};

export const signout = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => toast.info("You've successfully signed out"))
      .catch((err) => toast.error(err)); // use sentry
  }
  next();
};

export const isAuthenticated = () => {
  if (typeof window == undefined) return false;
  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  else return false;
};
