const express = require('express');
const router = express.Router();
const db = require('../db');
const { Book } = db.models;

router.get('/books', async (req, res, next) => {
  try {
  const books = await Book.findAll({
    order: [["author", "ASC"]]
  })
  res.render('index', {
    books,
    title: "Books"
  })
} catch(err) {
  return next(err);
}
});

router.get('/new', (req, res,) => {
  res.render('newBook', {
    title: "New Book"
  })
});

router.post('/books/new', async (req, res, next) => {
    try {
    const { title, author, genre, year } = req.body;  //takes values from input fields
    const newbook = await Book.Create({
       title,
       author,
       genre,
       year
   })
    .then(() => res.redirect('/books'));
  } catch(err){
    return next(err);
  }
});

// router.get('/books/:id', (req, res) => {
//   res.render('updateBook')
// });
// //
// router.post('/books/:id', (req, res) => {
//
// });
//
// router.post('/books/:id/delete', (req, res) => {
//
// });

module.exports = router;
