const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

/**
 * Middleware to verify the authenticity of a JSON Web Token (JWT).
 * @function verifyToken
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object.
 * @param {Express.NextFunction} next - The next middleware function.
 * @throws {Error} Unauthorized error if the token is missing or invalid.
 */
const verifyToken = (req, res, next) => {
  /**
   * JWT token extracted from the request headers.
   * @type {string}
   */
  const token = req.header('auth-token');
  if (!token) {
    next(boom.unauthorized('Access denied'));
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      next(boom.unauthorized('Invalid token'));
    }
  }
};

module.exports = { verifyToken };
