const express = require("express");

const app = express();

const port = 8000;

// app.get("/homepage", (req, res) => res.send("Homepage"));
// app.get("/signin", (req, res) => res.send("You are signed in!"));
// app.get("/signout", (req, res) => res.send("You are signed out!"));

// MIDDLEWARE FUNCTIONS
isLogged = true;
checkAdmin = true;
// middleware function
const isLoggedIn = (req, res, next) => {
  if (isLogged) {
    console.log("Logged in");
    next();
  } else console.log("Login first!!");
};
// middleware function
const isAdmin = (req, res, next) => {
  if (isLogged && checkAdmin) {
    console.log("Welcome, Admin");
    next();
  } else {
    console.log("U r not admin!");
  }
};
// the page requested by user
const admin = (req, res) => {
  res.send("ADMIN PAGE!");
};

// Calling middleware functions by 2 methods
app.use(isLoggedIn);
app.get("/admin", isAdmin, admin);

// Finally listening to the port
app.listen(port, () => {
  console.log("Server is up and running...");
});
