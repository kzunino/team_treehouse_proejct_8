const db = require('./db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Book } = db.models;
const { Op } = db.Sequelize;        //used to extract operator property from db.Sequelize.

app.set('view engine', 'pug');
app.use(express.static('public'));;     //serves the static folders in public folder
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const bookRoutes = require('./routes/books');
app.use(bookRoutes);
app.use('/books', bookRoutes);  //uses /books for url


// redirects to /books from index
app.get("/", (req, res) => {
  res.redirect("/books");
});


app.use((req, res, next ) => {                      //creates error object for non-existent url path
  const err = new Error('Oh no! Page not found.');
  err.status = 404;
  next(err);
});

app.use(( err, req, res, next ) => {
  res.locals.error = err;
  console.error(err.message);
  res.render('error');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
