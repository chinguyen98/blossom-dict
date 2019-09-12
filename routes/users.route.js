const express = require('express');
const route = express.Router();

const usersController = require('../controllers/users.controller');

route.get('/register', usersController.renderRegisterPage);

module.exports = route;