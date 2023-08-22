const boom = require('@hapi/boom');
const taskModel = require('../models/taskModel');

const findTask = async () => {
  return await taskModel.find();
};

const findTaskByUser = async (userId) => {
  return await taskModel.find({user:userId});
};

const findOneTask = async (id) => {
  const task = await taskModel.findOne({_id:id})
  if(!task){
    throw boom.notFound('Task not found')
  }
  return task;
};

const findTaskByTitle = async (userId, filter) => {
  try {
    console.log(filter, userId);
   const regex = new RegExp(filter, 'i');
    const tasks = await taskModel.find({user:userId, title:regex});
    return tasks;
  } catch (error) {
    throw boom.notFound('Task not found')
  }
}

const createTask = async (task) => {
  const newTask = await taskModel(task);
  newTask.save();
  return newTask;
}

const updateTask = async (id, task) => {
  const result = await taskModel.findOneAndUpdate({_id:id}, task);
  if(result === null){
    throw boom.notFound('Task not found');
  }
  return await taskModel.findOne({_id:id});
}

const deleteTask = async (id) => {
  const result = await taskModel.deleteOne({_id:id});
  if (result.deletedCount === 0) {
    throw boom.notFound('Task not found');
  }else{
    return result;
  }
}

module.exports = {
  findTask,
  findTaskByUser,
  findOneTask,
  createTask,
  updateTask,
  deleteTask,
  findTaskByTitle
};
