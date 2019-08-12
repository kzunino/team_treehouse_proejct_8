'use strict';

const Sequelize = require('sequelize');


module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      notNull:{
        msg: 'Please provide a value for "title"',
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      notNull:{
        msg: 'Please provide a value for "author"',
      }
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      notNull:{
        msg: 'Please provide a value for "genre"',
      }
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      notNull:{
        msg: 'Please provide a value for "author"',
      },
    },
  }, {
      paranoid: true,
      timestamps: true,
      freezeTableName: false,
      modelName: 'Books',
      tableNAme: 'Library',
      sequelize
  });

  return Book;
};
