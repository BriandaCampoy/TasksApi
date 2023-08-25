const express = require('express');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createTaskSchema,
  getTaskSchema,
  updateTaskSchema
} = require('../schemas/taskSchema');
const router = express.Router();
const {
  findTaskByUser,
  findOneTask,
  findTaskBySubject,
  createTask,
  updateTask,
  deleteTask,
  findTaskByTitle
} = require('../services/taskService');

/**
 * Route to retrieve tasks associated with the current user.
 * @route GET /tasks/user
 * @group Tasks - Managing user tasks.
 * @security JWT
 * @param {string} filter.query - Optional task title filter.
 * @returns {Array<Task>} 200 - An array of tasks associated with the user.
 */
router.get('/user', async (req, res) => {
  try {
    const { filter } = req.query;
    const { _id } = req.user.user;
    if (!filter) {
      const tasks = await findTaskByUser(_id);
      res.json(tasks);
    } else {
      const tasks = await findTaskByTitle(_id, filter);
      res.json(tasks);
    }
  } catch (error) {}
});

/**
 * Route to retrieve a specific task by its ID.
 * @route GET /tasks/:id
 * @group Tasks - Managing user tasks.
 * @param {string} id.path.required - The ID of the task to retrieve.
 * @security JWT
 * @returns {Task.model} 200 - The task object with the specified ID.
 * @returns {ErrorResponse.model} 404 - Task not found error response.
 */
router.get(
  '/:id',
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const taskFound = await findOneTask(id);
      if (taskFound) {
        res.status(200).json(taskFound);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Route to retrieve tasks associated with a specific subject.
 * @route GET /tasks/subject/:id
 * @group Tasks - Managing user tasks.
 * @param {string} id.path.required - The ID of the subject to filter tasks by.
 * @security JWT
 * @returns {Array<Task>} 200 - An array of tasks associated with the subject.
 * @returns {ErrorResponse.model} 404 - Subject not found error response.
 */
router.get(
  '/subject/:id',
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const idUser = req.user.user._id;
      const taskFound = await findTaskBySubject(idUser, id);
      if (taskFound) {
        res.status(200).json(taskFound);
      } else {
        res.status(404).json({ message: 'Subject not found' });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Route to create a new task.
 * @route POST /tasks
 * @group Tasks - Managing user tasks.
 * @param {CreateTaskData.model} task.body.required - Data for creating a new task.
 * @security JWT
 * @returns {CreateTaskResponse.model} 201 - Success message and created task data.
 * @returns {ErrorResponse.model} 400 - Error response for invalid input.
 */
router.post(
  '/',
  validatorHandler(createTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const newTask = req.body;
      newTask.user = req.user.user._id;
      const createdTask = await createTask(newTask);
      res.status(201).json({
        message: 'Task created successfully',
        data: createdTask
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Route to update a task by its ID.
 * @route PATCH /tasks/:id
 * @group Tasks - Managing user tasks.
 * @param {string} id.path.required - The ID of the task to update.
 * @param {UpdateTaskData.model} task.body.required - Data for updating the task.
 * @security JWT
 * @returns {Task.model} 200 - Updated task object.
 */
router.patch(
  '/:id',
  validatorHandler(getTaskSchema, 'params'),
  validatorHandler(updateTaskSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const task = await updateTask(id, body);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Route to delete a task by its ID.
 * @route DELETE /tasks/:id
 * @group Tasks - Managing user tasks.
 * @param {string} id.path.required - The ID of the task to delete.
 * @security JWT
 * @returns {DeleteTaskResponse.model} 200 - Success message and delete operation result.
 * @returns {ErrorResponse.model} 404 - Task not found error response.
 */
router.delete(
  '/:id',
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await deleteTask(id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
