const express = require('express');
const route = express.Router();

const indexController = require('../controllers/index.controller');

route.get('/', indexController.renderIndexPage);

module.exports = route;