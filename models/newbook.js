const mongoose = require("mongoose");

const newBookSchema = new mongoose.Schema(
  {
    title: { type: String },
    isbn: { type: Number },
    author: { type: String },
    description: { type: String },
    published_date: { type: String },
    publisher: { type: String },
    id: { type: String },
    // type: mongoose.Schema.Types.ObjectId, ref: "Users" =>if user details needed from Users collection
  },
  { collection: "Newbooks" }
);

const newBookModel = mongoose.model("Newbooks", newBookSchema);

module.exports = newBookModel;
