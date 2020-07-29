const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

// My Routes  (goto Route middlewares)
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

// Connecting to mongoDB
mongoose
  .connect(process.env.DATABASE, {
    // the link of db is not mentioned in here for security reasons, its in .env file (.env file is not uploaded to git)
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED!");
  });

// Adding Middlewares
app.use(bodyParser.json()); // creates req.body
app.use(cookieParser()); // used to save data in user's browser (cookies)
app.use(cors());

// Route Middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

// PORT
const port = process.env.PORT || 4000;

// Starting a server
app.listen(port, () => {
  console.log(`App is running at localhost:${port}/`);
});
