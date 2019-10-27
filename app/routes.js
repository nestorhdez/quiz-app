const router = require('express').Router();
const userController = require('./controllers/users-controller');
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

module.exports = router;