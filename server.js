const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')


const app = express();
app.use(express.json());

app.use(cors());

require('./auth/index')

routerApi(app);
app.use(boomErrorHandler)
app.use(logErrors);
app.use(errorHandler);


module.exports = app;