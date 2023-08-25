const { port, host }= require('./config/generalConfig');
const {startMongoDb, startMongoAtlas} = require('./services/dbService')
const app = require('./server')

/**
 * Check the environment and start the appropriate database service.
 * If the environment is not 'mongo', MongoDB Atlas service is started, otherwise local MongoDB service is started.
 * @function
 */
if(process.env.NODE_ENV !== 'mongo'){
  startMongoDb();
}else{
  startMongoAtlas();
}

/**
 * Start the Express application server and listen on the specified port and host.
 */
app.listen(port, ()=>{
  console.log(`http://${host}:${port}/`);
})