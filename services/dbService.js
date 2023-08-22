const { db } = require('../config/dbConfig');

const mongoose = require('mongoose');

const startMongoDb = () => {
  mongoose.connect(
    `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.dbName}?authSource=admin&readPreference=primary&ssl=false&directConnection=true`
  )
  .then(()=> console.log('Connected to MongoDB'))
  .catch((err)=> console.log('Could not connect to MongoDB'))
};

module.exports = { startMongoDb };
