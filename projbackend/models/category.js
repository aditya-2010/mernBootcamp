const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true } // stores the time when a new entry is made in the schema
);

module.exports = mongoose.model("Category", categorySchema);
