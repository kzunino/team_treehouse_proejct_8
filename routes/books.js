const express = require('express');
const router = express.Router();
const db = require('../db');
const { Book } = db.models;

router.get('/books', (req, res) => {
  res.render('index');
});

router.get('/new', (req, res) => {
  res.render('newBook')
});
//
// router.post('/books/new', (req, res) => {
//
// });
//
// router.get('/books/:id', (req, res) => {
//   res.render('updateBook')
// });
//
// router.post('/books/:id', (req, res) => {
//
// });
//
// router.post('/books/:id/delete', (req, res) => {
//
// });

module.exports = router;
