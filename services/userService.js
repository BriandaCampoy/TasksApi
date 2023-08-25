const boom = require('@hapi/boom');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
/**
 * Register a new user.
 * @async
 * @param {Object} data - The user registration data.
 * @throws {BoomError} If the provided email already exists.
 * @returns {Promise<Object>} The newly registered user object.
 */
const registerUser = async (data) => {
  const newUser = new userModel(data);
  const isEmailExist = await userModel.findOne({ email: newUser.email });
  if (isEmailExist) {
    throw boom.conflict('Email already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.password, salt);
  newUser.password = password;
  newUser.save();
  return newUser;
};

/**
 * Update a user by their ID.
 * @async
 * @param {string} id - The ID of the user to update.
 * @param {Object} newData - The updated user data.
 * @throws {BoomError} If the user is not found.
 * @returns {Promise<Object>} The updated user object.
 */
const updateUser = async (id, newData) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(newData.password, salt);
  newData.password = password;
  const result = await userModel.findOneAndUpdate({ _id: id }, newData);
  if(result==null) {
    throw boom.notFound('User not found')
  }
  return await userModel.findOne({_id:id});
};

/**
 * Get a user by their email.
 * @async
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<Object|null>} The user object if found, or null if not found.
 */
const getUserByEmail = async (email) => {
  const user = await userModel.findOne({ email: email });
  return user;
};

/**
 * Module exports for user-related functions.
 */
module.exports = {
  registerUser,
  updateUser,
  getUserByEmail
};
