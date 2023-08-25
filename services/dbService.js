const { db, atlas } = require('../config/dbConfig');

const mongoose = require('mongoose');

/**
 * Start a connection to a local MongoDB database using provided configuration.
 * @function
 */
const startMongoDb = () => {
  mongoose.connect(
    `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.dbName}?authSource=admin&readPreference=primary&ssl=false&directConnection=true`
  )
  .then(()=> console.log('Connected to MongoDB'))
  .catch((err)=> console.log('Could not connect to MongoDB'))
};

/**
 * Start a connection to MongoDB Atlas using the provided URL from configuration.
 * @function
 */
const startMongoAtlas = ()=>{
  mongoose.connect(atlas.url)
  .then(()=> console.log('Connected to MongoDB Atlas'))
  .catch((err)=> console.log('Could not connect to MongoDB Atlas'))
}

/**
 * Module exports for the database service functions.
 */
module.exports = { startMongoDb, startMongoAtlas };
