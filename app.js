const db = require('./db');
const { Book } = db.models;
const { Op } = db.Sequelize;        //used to extract operator property from db.Sequelize.


(async () =>{
  await db.sequelize.sync({ force: true })  //drops table and recreates it when app restarted

  try{
    const bookInstances = await Promise.all([
      Book.create({})
    ])

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
  }
})
