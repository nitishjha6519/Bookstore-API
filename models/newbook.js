const mongoose = require("mongoose");

const newBookSchema = new mongoose.Schema(
  {
    title: { type: String },
    isbn: { type: Number },
    author: { type: String },
    description: { type: String },
    published_date: { type: String },
    publisher: { type: String },
  },
  { collection: "Newbooks" }
);

const newBookModel = mongoose.model("Newbooks", newBookSchema);

module.exports = newBookModel;
