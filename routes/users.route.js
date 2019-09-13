const express = require('express');
const route = express.Router();

const usersController = require('../controllers/users.controller');
const validateMiddleware = require('../middleware/validate.middleware');

route.get('/register', usersController.renderRegisterPage);

route.post('/register', validateMiddleware.validateRegisterForm, usersController.registerUser);

module.exports = route;