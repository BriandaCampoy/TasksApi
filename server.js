const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

/**
 * Create an Express application.
 * @type {Object}
 */
const app = express();
/**
 * Middleware to parse incoming JSON data.
 * @function
 * @memberof app
 */
app.use(express.json());

/**
 * Middleware to enable Cross-Origin Resource Sharing (CORS).
 * @function
 * @memberof app
 */
app.use(cors());

// Load authentication module
require('./auth/index')

/**
 * Attach the API routes to the Express app.
 * @function
 * @memberof app
 * @param {Object} app - The Express app instance.
 */
routerApi(app);

/**
 * Middleware to handle Boom errors.
 * @function
 * @memberof app
 */
app.use(boomErrorHandler)

/**
 * Middleware to log errors.
 * @function
 * @memberof app
 */
app.use(logErrors);

/**
 * Middleware to handle application errors.
 * @function
 * @memberof app
 */
app.use(errorHandler);

/**
 * Module exports.
 * @module app
 */
module.exports = app;