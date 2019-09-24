const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './public/images' });
const route = express.Router();

const flowersController = require('../controllers/flowers.controller');
const validateMiddleware = require('../middleware/validate.middleware');

route.get('/', flowersController.renderFlowerDict);

route.get('/:id', flowersController.renderFlowerDetail);

route.post('/', upload.single('picture'), validateMiddleware.validateAddFlowerForm, flowersController.addFlower);

module.exports = route;