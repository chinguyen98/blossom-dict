const express = require('express');
const route = express.Router();

const usersController = require('../controllers/users.controller');

const validateMiddleware = require('../middleware/validate.middleware');
const authMiddleware = require('../middleware/auth.middleware');

route.get('/', authMiddleware.ensureAuthenticated, usersController.renderUserPage);

route.get('/register', usersController.renderRegisterPage);

route.get('/login', usersController.renderLoginPage);

route.get('/logout', usersController.logout);

route.get('/changePassword', usersController.renderUserPage);

route.post('/register', validateMiddleware.validateRegisterForm, usersController.registerUser);

route.post('/login', authMiddleware.authentication);

route.post('/changePassword', validateMiddleware.validateChangePasswordForm, usersController.changePassword);

module.exports = route;