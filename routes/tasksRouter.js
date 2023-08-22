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
  createTask,
  updateTask,
  deleteTask,
  findTaskByTitle
} = require('../services/taskService');

router.get(
  '/user/:id',
  validatorHandler(getTaskSchema, 'params'),
  async (req, res) => {
    try {
      const { filter } = req.query;
      const { id } = req.params;
      if (!filter) {
        const tasks = await findTaskByUser(id);
        res.json(tasks);
      } else {
        const tasks = await findTaskByTitle(id, filter);
        res.json(tasks);
      }
    } catch (error) {}
  }
);


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

router.post(
  '/',
  validatorHandler(createTaskSchema, 'body'),
  async (req, res) => {
    try {
      const newTask = await createTask(req.body);
      res.status(201).json({
        message: 'Task created successfully',
        data: newTask
      });
    } catch (error) {
      next(error);
    }
  }
);

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
