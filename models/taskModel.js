const mongoose = require('mongoose');

/**
 * @typedef Task
 * @property {string} title.required - The title of the task.
 * @property {string} description - The description of the task.
 * @property {Date} deadline - The deadline for the task.
 * @property {string} type.required - The type of the task. Enum: project, homework.
 * @property {string} user - The user associated with the task.
 * @property {boolean} done - Indicates whether the task is done.
 * @property {string} subject - The subject associated with the task.
 */
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  deadline: {
    type: Date
  },
  type: {
    type: String,
    enum: ['project', 'homework'],
    required: true,
    default: 'homework'
  },
  user: {
    type: String,
    ref: 'user'
  },
  done: {
    type: Boolean,
    default: false
  },
  subject: {
    type: String,
    ref: 'subject'
  }
});

/**
 * Represents a task in the application.
 * @class TaskModel
 */
const taskModel = mongoose.model('task', taskSchema);

/**
 * Module exports for the Task model.
 * @type {TaskModel}
 */
module.exports = taskModel;
