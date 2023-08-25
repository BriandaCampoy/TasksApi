const Joi = require('joi');
const { ObjectId } = require('mongodb');

/**
 * Custom Joi validation function for validating MongoDB ObjectIDs.
 * @function
 * @param {string} value - The value to validate.
 * @param {Object} helpers - Joi validation helpers.
 * @returns {string} The valid ObjectID if validation succeeds.
 * @throws {string} The error message 'any.invalid' if validation fails.
 */
const id = Joi.string().custom((value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectID');
const title = Joi.string().min(3).max(50);
const description = Joi.string().min(3).max(1024);
const deadline = Joi.date();
const type = Joi.string().valid('project', 'homework');
const done = Joi.bool();

/**
 * Joi schema for creating a task.
 */
const createTaskSchema = Joi.object({
  title: title.required(),
  description: description.allow(null, ''),
  deadline: deadline.required(),
  type: type.required(),
  subject: id.required(),
});

/**
 * Joi schema for updating a task.
 */
const updateTaskSchema = Joi.object({
  title: title,
  description: description.allow(null, ''),
  deadline: deadline,
  type: type,
  done:done,
  subject: id,
  id:id,
  user:id
});

/**
 * Joi schema for updating a task.
 */
const getTaskSchema = Joi.object({
  id: id.required()
});

/**
 * Module exports for validation schemas.
 */
module.exports = {
  createTaskSchema,
  updateTaskSchema,
  getTaskSchema
};
