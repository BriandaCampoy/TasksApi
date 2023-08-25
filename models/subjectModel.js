const mongoose = require('mongoose');

/**
 * @typedef Subject
 * @property {string} name.required - The name of the subject.
 * @property {string} color.required - The color associated with the subject.
 * @property {string} user - The user associated with the subject.
 */
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  user: {
    type: String,
    ref: 'user'
  }
});

/**
 * Represents a subject in the application.
 * @class SubjectModel
 */
const subjectModel = mongoose.model('subject', subjectSchema);

/**
 * Module exports for the Subject model.
 * @type {SubjectModel}
 */
module.exports = subjectModel;
