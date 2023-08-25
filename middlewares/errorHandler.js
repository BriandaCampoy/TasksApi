/**
 * Middleware to log errors to the console.
 * @function logErrors
 * @param {Error} err - The error object.
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object.
 * @param {Express.NextFunction} next - The next middleware function.
 */
function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

/**
 * Middleware to handle general errors by sending a JSON response with error details.
 * @function errorHandler
 * @param {Error} err - The error object.
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object.
 * @param {Express.NextFunction} next - The next middleware function.
 */
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

/**
 * Middleware to handle errors created using the Boom library.
 * @function boomErrorHandler
 * @param {Error} err - The error object.
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object.
 * @param {Express.NextFunction} next - The next middleware function.
 */
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
