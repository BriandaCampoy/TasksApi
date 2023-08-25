const boom = require('@hapi/boom');
const subjectModel = require('../models/subjectModel');
const taskModel = require('../models/taskModel');

/**
 * Find subjects associated with a specific user.
 * @async
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} An array of subjects associated with the user.
 */
const findSubjectByUser = async (userId) => {
  return await subjectModel.find({user:userId});
};

/**
 * Find a subject by its ID.
 * @async
 * @param {string} id - The ID of the subject.
 * @throws {BoomError} If the subject is not found.
 * @returns {Promise<Object>} The subject object if found.
 */
const findOneSubject = async (id) => {
  const subject = await subjectModel.findOne({_id:id})
  if(!subject){
    throw boom.notFound('Subject not found')
  }
  return subject;
};

/**
 * Create a new subject.
 * @async
 * @param {Object} subject - The subject object to create.
 * @returns {Promise<Object>} The created subject object.
 */
const createSubject = async (subject) => {
  const newSubject = await subjectModel(subject);
  newSubject.save();
  return newSubject;
}

/**
 * Update a subject by its ID.
 * @async
 * @param {string} id - The ID of the subject to update.
 * @param {Object} subject - The updated subject data.
 * @throws {BoomError} If the subject is not found.
 * @returns {Promise<Object>} The updated subject object.
 */
const updateSubject = async (id, subject) => {
  const result = await subjectModel.findOneAndUpdate({_id:id}, subject);
  if(result === null){
    throw boom.notFound('Subject not found');
  }
  return await subjectModel.findOne({_id:id});
}

/**
 * Delete a subject by its ID.
 * @async
 * @param {string} id - The ID of the subject to delete.
 * @throws {BoomError} If the subject is not found.
 * @returns {Promise<Object>} The result of the delete operation.
 */
const deleteSubject = async (id) => {
  const tasks = await taskModel.deleteMany({subject:id})
  const result = await subjectModel.deleteOne({_id:id});
  if (result.deletedCount === 0) {
    throw boom.notFound('Subject not found');
  }else{
    return result;
  }
}

/**
 * Module exports for subject-related functions.
 */
module.exports = {
  findSubjectByUser,
  findOneSubject,
  createSubject,
  updateSubject,
  deleteSubject
};
