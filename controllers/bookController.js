const mongoose = require('mongoose');
const bookModel = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json(books);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error al obtener los libros', details: err.message });
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'ID no es válido' });
  try {
    const book = await bookModel.findById(id);
    if (!book) return res.status(404).json({ error: 'No encontrado' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar', details: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = new bookModel(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res
      .status(400)
      .json({ error: 'Error al crear un libro nuevo', details: err.message });
  }
};

exports.editBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'ID inválido' });
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) return res.status(404).json({ error: 'No encontrado' });
    res.status(200).json(updatedBook);
  } catch (err) {
    res
      .status(400)
      .json({ error: 'Error al actualizar', details: err.message });
  }

  exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'id no inválido' });
    try {
      const deletedBook = await bookModel.findByIdAndDelete(id);
      if (!deletedBook) return res.status(404).json({ error: 'No encontrado' });
      res
        .status(200)
        .json({ message: 'libro ha sido eliminado correctamente' });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Error al eliminar', details: err.message });
    }
  };
};
