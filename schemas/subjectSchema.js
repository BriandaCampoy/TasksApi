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
const name = Joi.string().min(3).max(50);
const color = Joi.string().min(3).max(1024);

/**
 * Joi schema for creating a subject.
 */
const createSubjectSchema = Joi.object({
  name: name.required(),
  color: color.required()
});

/**
 * Joi schema for updating a subject.
 */
const updateSubjectSchema = Joi.object({
  name: name,
  color: color
});

/**
 * Joi schema for getting a subject by its ID.
 */
const getSubjectSchema = Joi.object({
  id: id.required()
});

/**
 * Module exports for validation schemas.
 */
module.exports = {
  createSubjectSchema,
  updateSubjectSchema,
  getSubjectSchema
};
