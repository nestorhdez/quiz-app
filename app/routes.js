const router = require('express').Router();
const userController = require('./controllers/users-controller');
const questionsController = require('./controllers/questions-controller');
const jwt = require('./helpers/jwt');
const pass = require('./middlewares/auth');

/**
 * Users
 */
router.get('/users', pass.authAdmin, userController.getUsers);
router.get('/users/:id', pass.authAdmin, userController.getUserById);
router.patch('/users/:id', pass.authAdmin, userController.editUser);
router.delete('/users/:id', pass.authAdmin, userController.deleteUser);
router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.post('/token', jwt.refreshToken);

/**
 * Questions
 */
router.get('/questions', pass.authAll, questionsController.getQuestions);
router.get('/questions/:id', pass.authAll, questionsController.getQuestionById);
router.post('/questions/', pass.authAdmin, questionsController.postQuestion);
router.patch('/questions/:id', pass.authAdmin, questionsController.editQuestion);
router.delete('/questions/:id', pass.authAdmin, questionsController.deleteQuestion);

module.exports = router;