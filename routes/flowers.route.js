const express = require('express');
const route = express.Router();

const flowersController = require('../controllers/flowers.controller');

route.get('/dict', flowersController.renderFlowerDict);

module.exports = route;