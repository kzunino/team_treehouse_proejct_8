const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db',
  logging: false
// Global options to adjust models
  // define: {
  //   freezeTableName: true,
  //   timestamps: false,
  // }
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

//imports new model
db.models.Book = require('./models/book.js')(sequelize);

module.exports = db;
