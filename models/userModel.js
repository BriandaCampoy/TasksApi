const mongoose = require('mongoose');

/**
 * @typedef User
 * @property {string} name.required - The name of the user.
 * @property {string} email.required - The email address of the user.
 * @property {string} password.required - The hashed password of the user.
 */
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  password: {
    type: String,
    required: true,
    min: 6
  }
});

/**
 * Represents a user in the application.
 * @class UserModel
 */
const userModel = mongoose.model('user', userSchema);

/**
 * Module exports for the User model.
 * @type {UserModel}
 */
module.exports = userModel;
