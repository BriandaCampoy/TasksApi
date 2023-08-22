const Joi = require('joi');
const { ObjectId } = require('mongodb');

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

const createTaskSchema = Joi.object({
  title: title.required(),
  description: description,
  deadline: deadline.required(),
  type: type.required(),
  user:id.required()
});

const updateTaskSchema = Joi.object({
  title: title,
  description: description,
  deadline: deadline,
  type: type
});

const getTaskSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  getTaskSchema
};
