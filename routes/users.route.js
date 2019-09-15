const express = require('express');
const route = express.Router();

const usersController = require('../controllers/users.controller');

const validateMiddleware = require('../middleware/validate.middleware');
const authMiddleware = require('../middleware/auth.middleware');

route.get('/', usersController.renderUserPage);

route.get('/register', usersController.renderRegisterPage);

route.get('/login', usersController.renderLoginPage);

route.post('/register', validateMiddleware.validateRegisterForm, usersController.registerUser);

route.post('/login', authMiddleware.authentication);



module.exports = route;