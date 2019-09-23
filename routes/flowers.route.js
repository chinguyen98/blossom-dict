const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const route = express.Router();

const flowersController = require('../controllers/flowers.controller');
const validateMiddleware = require('../middleware/validate.middleware');

route.get('/', flowersController.renderFlowerDict);

route.post('/', upload.single('picture'), validateMiddleware.validateAddFlowerForm, flowersController.addFlower);

module.exports = route;