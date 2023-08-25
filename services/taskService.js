const boom = require('@hapi/boom');
const taskModel = require('../models/taskModel');

/**
 * Find all tasks.
 * @async
 * @returns {Promise<Array>} An array of all tasks.
 */
const findTask = async () => {
  return await taskModel.find();
};

/**
 * Find tasks associated with a specific user and populate their subject information.
 * @async
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} An array of tasks associated with the user, with populated subject information.
 */
const findTaskByUser = async (userId) => {
  return await taskModel.find({user:userId}).populate('subject');
};

/**
 * Find tasks associated with a specific user and subject, and populate their subject information.
 * @async
 * @param {string} userId - The ID of the user.
 * @param {string} subjectId - The ID of the subject.
 * @returns {Promise<Array>} An array of tasks associated with the user and subject, with populated subject information.
 */
const findTaskBySubject = async (userId, subjectId) => {
  return await taskModel.find({ user: userId, subject: subjectId }).populate('subject');
};

/**
 * Find a task by its ID and populate its subject information.
 * @async
 * @param {string} id - The ID of the task.
 * @throws {BoomError} If the task is not found.
 * @returns {Promise<Object>} The task object with populated subject information if found.
 */
const findOneTask = async (id) => {
  const task = await taskModel.findOne({ _id: id }).populate('subject');
  if (!task) {
    throw boom.notFound('Task not found');
  }
  return task;
};

/**
 * Find tasks by their title and associated user, with case-insensitive filtering, and populate subject information.
 * @async
 * @param {string} userId - The ID of the user.
 * @param {string} filter - The title filter to search for.
 * @throws {BoomError} If no tasks match the title filter.
 * @returns {Promise<Array>} An array of tasks that match the title filter, with populated subject information.
 */
const findTaskByTitle = async (userId, filter) => {
  try {
    const regex = new RegExp(filter, 'i');
    const tasks = await taskModel.find({ user: userId, title: regex }).populate('subject');
    return tasks;
  } catch (error) {
    throw boom.notFound('Task not found');
  }
};

/**
 * Create a new task.
 * @async
 * @param {Object} task - The task object to create.
 * @returns {Promise<Object>} The created task object.
 */
const createTask = async (task) => {
  const newTask = await taskModel(task);
  newTask.save();
  return newTask;
};

/**
 * Create a new task.
 * @async
 * @param {Object} task - The task object to create.
 * @returns {Promise<Object>} The created task object.
 */
const updateTask = async (id, task) => {
  const result = await taskModel.findOneAndUpdate({ _id: id }, task);
  if (result === null) {
    throw boom.notFound('Task not found');
  }
  return await taskModel.findOne({ _id: id });
};

/**
 * Delete a task by its ID.
 * @async
 * @param {string} id - The ID of the task to delete.
 * @throws {BoomError} If the task is not found.
 * @returns {Promise<Object>} The result of the delete operation.
 */
const deleteTask = async (id) => {
  const result = await taskModel.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw boom.notFound('Task not found');
  } else {
    return result;
  }
};

/**
 * Module exports for task-related functions.
 */
module.exports = {
  findTask,
  findTaskByUser,
  findTaskBySubject,
  findOneTask,
  createTask,
  updateTask,
  deleteTask,
  findTaskByTitle
};
