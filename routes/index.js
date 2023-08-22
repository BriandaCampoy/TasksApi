const express = require('express');
const tasksRouter = require('./tasksRouter');
const authRouter = require('./authRouter');
const { verifyToken } = require('../middlewares/validate-token');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/tasks', verifyToken, tasksRouter);
}

module.exports = routerApi;
