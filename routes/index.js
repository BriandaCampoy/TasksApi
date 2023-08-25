const express = require('express');
const tasksRouter = require('./tasksRouter');
const authRouter = require('./authRouter');
const subjectRouter = require('./subjectRouter');
const { verifyToken } = require('../middlewares/validate-token');

/**
 * Configures and sets up the API routes for the application.
 * @param {Object} app - The Express application instance.
 */
function routerApi(app) {
  const router = express.Router();
  /**
   * Mounts the router at the '/api/v1' base path.
   */
  app.use('/api/v1', router);
  /**
   * Mounts the authentication router under the '/auth' path.
   */
  router.use('/auth', authRouter);
  /**
   * Mounts the tasks router under the '/tasks' path.
   * Requires JWT token verification.
   */
  router.use('/tasks', verifyToken, tasksRouter);
  /**
   * Mounts the subject router under the '/subject' path.
   * Requires JWT token verification.
   */
  router.use('/subject', verifyToken, subjectRouter);
}

module.exports = routerApi;
