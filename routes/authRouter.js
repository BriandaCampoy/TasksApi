const router = require('express').Router();
const passport = require('passport');
const {
  userRegisterSchema,
  userLoginSchema
} = require('../schemas/userSchema');
const { registerUser, updateUser } = require('../services/userService');
const validatorHandler = require('../middlewares/validatorHandler');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/validate-token');

/**
 * Route to register a new user.
 * @route POST /auth/register
 * @group Authentication - User registration and login.
 * @param {UserRegisterData.model} user.body.required - User registration data.
 * @returns {User.model} 200 - Newly registered user object.
 * @returns {ErrorResponse.model} 400 - Registration error response.
 */
router.post(
  '/register',
  validatorHandler(userRegisterSchema, 'body'),
  async (req, res, next) => {
    try {
      const result = await registerUser(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Route to retrieve user profile information.
 * @route GET /auth/profile
 * @group Authentication - User registration and login.
 * @security JWT
 * @returns {PublicUser.model} 200 - User profile information.
 * @returns {ErrorResponse.model} 400 - Profile retrieval error response.
 */
router.get('/profile', verifyToken, async (req, res, next) => {
  try {
    const { iat, ...user } = req.user;
    const { password, ...publicUser } = user.user;
    res.send(publicUser);
  } catch (error) {
    next(error);
  }
});

/**
 * Route to update user information.
 * @route PATCH /auth/:id
 * @group Authentication - User registration and login.
 * @param {string} id.path.required - User ID to update.
 * @param {UserUpdateData.model} user.body.required - Updated user data.
 * @security JWT
 * @returns {User.model} 200 - Updated user object.
 * @returns {ErrorResponse.model} 400 - User update error response.
 */
router.patch('/:id', verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const result = await updateUser(id, body);
    res.send(result);
  } catch (error) {}
});

/**
 * Route to handle user login.
 * @route POST /auth/login
 * @group Authentication - User registration and login.
 * @param {UserLoginData.model} user.body.required - User login data.
 * @returns {AuthResponse.model} 200 - Authentication response containing user data and token.
 * @returns {ErrorResponse.model} 400 - Login error response.
 */
router.post(
  '/login',
  validatorHandler(userLoginSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        user
      };

      const token = jwt.sign(payload, process.env.TOKEN_SECRET);

      const { password, ...userPublicData } = user.toObject();
      res.header('auth-token', token).json({ userPublicData, token });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
