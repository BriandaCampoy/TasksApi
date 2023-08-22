const { port, host }= require('./config/generalConfig');
const {startMongoDb} = require('./services/dbService')
const app = require('./server')

startMongoDb();


app.listen(port, ()=>{
  console.log(`http://${host}:${port}/`);
})