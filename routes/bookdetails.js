const express = require("express");
const newBookModel = require("../models/newbook");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    let data = req.body;
    // console.log(data);
    const userid = req.id;
    let book = await newBookModel.find({ title: data.title });
    console.log(book);

    //check if book is stored previously or not,if stored then data would not be empty
    if (book.length !== 0) {
      return res.status(400).json({
        status: "failed",
        message: "book is already stored",
      });
    }

    let newBook = await newBookModel.create({ ...data, id: userid });
    return res.status(400).json({
      status: "success",
      message: "book stored in db successfully",
      title: newBook.title,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

//fetch details of all books from a user

router.get("/", async (req, res) => {
  try {
    const id = req.id;

    let books = await newBookModel.find({ id: id });
    console.log({ books });
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

router.get("/:isbn", async (req, res) => {
  try {
    let isbn = req.params;
    let user = req.id;
    console.log(user);
    let count = await newBookModel.count();
    let book = await newBookModel.find({ _id: user });
    if (book) {
      return res.status(200).json({
        status: "success",
        book: book,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

module.exports = router;
