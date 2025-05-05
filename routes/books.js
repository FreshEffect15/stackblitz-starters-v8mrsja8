const express = require('express');
const routes = express.Router();
const bookController = require('../controllers/bookController');

routes.get('/', bookController.getAllBooks);
routes.get('/:id', bookController.getBookById);
routes.post('/', bookController.createBook);
routes.put('/:id', bookController.editBook);
routes.delete('/:id', bookController.deleteBook);

module.exports = routes;
