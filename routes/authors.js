const express = require('express');
const routes = express.Router();
const authorController = require('../controllers/authorController');

routes.get('/', authorController.getAllAuthors);
routes.get('/:id', authorController.getAuthorById);
routes.post('/', authorController.createAuthor);
routes.delete('/:id', authorController.deleteAuthor);
routes.put('/:id/addBook/:bookId', authorController.assignBooks);

module.exports = routes;
