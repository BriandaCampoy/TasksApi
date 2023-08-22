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

router.post(
  '/register',
  validatorHandler(userRegisterSchema, 'body'),
  async (req, res, next) => {
    try {
      registerUser(req.body);
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const result = await updateUser(id, body);
    res.send(result);
  } catch (error) {}
});

router.post(
  '/login',
  validatorHandler(userLoginSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        user
      }
    
      const token =  jwt.sign(
        payload,
        process.env.TOKEN_SECRET
      );

      const {password, ...userPublicData} = user.toObject();
      res.header('auth-token', token).json({userPublicData, token});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
