const Joi = require('joi');

const name = Joi.string().min(3).max(255);
const email = Joi.string().min(6).max(255).email();
const password = Joi.string().min(6).max(1024);

const userRegisterSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required()
});

const userLoginSchema = Joi.object({
  email: name.required(),
  password: password.required()
})

module.exports = { userRegisterSchema, userLoginSchema };