const express = require("express");
const router = express.Router();
const db = require("../db");
const { Book } = db.models;

router.get("/books", async (req, res, next) => {
  try {
    const books = await Book.findAll({
      order: [["author", "ASC"]]
    });
    res.render("index", {
      books,
      title: "Books"
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/books/new", (req, res) => {
  res.render("newBook", {
    title: "New Book"
  });
});

router.post("/books/new", async (req, res, next) => {
  try {
    const { title, author, genre, year } = req.body; //takes values from input fields
    const newbook = await Book.create({
      title,
      author,
      genre,
      year
    }).then(() => res.redirect("/books"));
  } catch (err) {
    return next(err);
  }
});

router.get("/books/detail/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("updateBook", { book });
    }
  } catch (error) {
    return next(error);
  }
});

router.post("/books/detail/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      const { title, author, genre, year } = req.body;
      await book.update({ title, author, genre, year });
      res.redirect("/books");
    } else {
      const err = new Error("Failed to update...");
      return next(err);
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map(err => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
  }
});

router.post("/books/detail/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      return book.destroy();
    } else {
      return next(err);
    }
    res.redirect("/books");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map(err => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
  }
});

module.exports = router;
