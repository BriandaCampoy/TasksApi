const express = require('express');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createSubjectSchema,
  updateSubjectSchema,
  getSubjectSchema
} = require('../schemas/subjectSchema');
const router = express.Router();
const {
  findSubjectByUser,
  findOneSubject,
  createSubject,
  updateSubject,
  deleteSubject
} = require('../services/subjectService');

/**
 * Route to retrieve subjects associated with the current user.
 * @route GET /subject
 * @group Subjects - Managing user subjects.
 * @security JWT
 * @returns {Array<Subject>} 200 - An array of subjects associated with the user.
 */
router.get('/', async (req, res) => {
  try {
    const { _id } = req.user.user;
    const subject = await findSubjectByUser(_id);
    res.json(subject);
  } catch (error) {}
});

/**
 * Route to retrieve a specific subject by its ID.
 * @route GET /subject/:id
 * @group Subjects - Managing user subjects.
 * @param {string} id.path.required - The ID of the subject to retrieve.
 * @security JWT
 * @returns {Subject.model} 200 - The subject object with the specified ID.
 * @returns {ErrorResponse.model} 404 - Subject not found error response.
 */
router.get(
  '/:id',
  validatorHandler(getSubjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const subjectFound = await findOneSubject(id);
      if (subjectFound) {
        res.status(200).json(subjectFound);
      } else {
        res.status(404).json({ message: 'Subject not found' });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Route to create a new subject.
 * @route POST /subject
 * @group Subjects - Managing user subjects.
 * @param {CreateSubjectData.model} subject.body.required - Data for creating a new subject.
 * @security JWT
 * @returns {CreateSubjectResponse.model} 201 - Success message and created subject data.
 * @returns {ErrorResponse.model} 400 - Error response for invalid input.
 */
router.post(
  '/',
  validatorHandler(createSubjectSchema, 'body'),
  async (req, res, next) => {
    try {
      const newSubject = req.body;
      newSubject.user = req.user.user._id;
      const createdSubject = await createSubject(newSubject);
      res.status(201).json({
        message: 'Subject created successfully',
        data: createdSubject
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Route to create a new subject.
 * @route POST /subject
 * @group Subjects - Managing user subjects.
 * @param {CreateSubjectData.model} subject.body.required - Data for creating a new subject.
 * @security JWT
 * @returns {CreateSubjectResponse.model} 201 - Success message and created subject data.
 * @returns {ErrorResponse.model} 400 - Error response for invalid input.
 */
router.patch(
  '/:id',
  validatorHandler(getSubjectSchema, 'params'),
  validatorHandler(updateSubjectSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const subject = await updateSubject(id, body);
      res.json(subject);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Route to delete a subject by its ID.
 * @route DELETE /subject/:id
 * @group Subjects - Managing user subjects.
 * @param {string} id.path.required - The ID of the subject to delete.
 * @security JWT
 * @returns {DeleteSubjectResponse.model} 200 - Success message and delete operation result.
 * @returns {ErrorResponse.model} 404 - Subject not found error response.
 */
router.delete(
  '/:id',
  validatorHandler(getSubjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await deleteSubject(id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
