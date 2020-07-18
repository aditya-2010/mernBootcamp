const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");

// Connecting to mongoDB
mongoose
  .connect(process.env.DATABASE, {
    // the link of db is not mentioned in here for scurity reasons, its in .env file (.env file is not uploaded to git)
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED!");
  });

// Adding Middlewares
app.use(bodyParser.json());
app.use(cookieParser()); // used to save data in user's browser (cookies)
app.use(cors());

// Route Middleware
app.use("/api", authRoutes);

// PORT
const port = process.env.PORT || 4000;

// Starting a server
app.listen(port, () => {
  console.log(`App is running at localhost:${port}/`);
});
