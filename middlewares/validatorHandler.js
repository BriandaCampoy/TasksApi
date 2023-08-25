const boom = require('@hapi/boom');

/**
 * Middleware to handle validation using a specified schema.
 * @function validatorHandler
 * @param {Joi.Schema} schema - The schema to validate the data against.
 * @param {string} property - The property on the request object containing the data to validate.
 * @returns {function} Express middleware function that validates the data against the schema.
 */
function validatorHandler(schema, property) {
   /**
   * Express middleware function.
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object.
   * @param {Express.NextFunction} next - The next middleware function.
   */
  return (req, res, next)=>{
    const data = req[property];
    const {error} = schema.validate(data, {abortEarly: false});
    if(error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;