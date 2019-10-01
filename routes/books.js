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
      title: "Library List"
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/books/new", (req, res) => {
  res.render("newBook");
});

router.post("/books/new", async (req, res, next) => {
  try {
    const { title, author, genre, year } = req.body; //takes values from input fields
    const newbook = await Book.create({
      title,
      author,
      genre,
      year
    })
    res.redirect("/books");
  } catch (err) {
    if (err.name === "SequelizeValidationError"){   //uses custom sql error message as li error in pug
      res.render("newBook", {
        errors: err.errors
      });
    };
  }
});

router.get("/books/detail/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("updateBook", { book });
    } else {
      const err = new Error('Book does not exist');
      res.render('error');
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
    return next(error)
  }
});

router.post("/books/:id/delete", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
       book.destroy();
    } else {
      return next(err);
    }
    res.redirect("/books");
  } catch (error) {
    return next(error)
    }
});

module.exports = router;
