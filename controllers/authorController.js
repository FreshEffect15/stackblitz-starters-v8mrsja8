const mongoose = require('mongoose');
const authorModel = require('../models/Author');

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await authorModel.find().populate('Book');
    res.status(200).json(authors);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'error al obtener los autores', details: err.message });
  }
};

exports.getAuthorById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'el id no es válido' });
  try {
    const author = await authorModel.findById(id).populate('Book');
    if (!author) return res.status(404).json({ error: 'No encontrado' });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({
      error: 'error al encontrar un autor por id',
      details: err.message,
    });
  }

  exports.createAuthor = async (req, res) => {
    try {
      const newAuthor = new authorModel(req.body);
      await newAuthor.save();
      res.status(201).json(newAuthor);
    } catch (err) {
      res
        .status(400)
        .json({ error: 'error al crear un autor', details: err.message });
    }
  };

  exports.editAuthor = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'id no válido' });
    try {
      const updatedAuthor = await authorModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedAuthor)
        return res.status(404).json({ error: 'No encontrado' });
      res.status(200).json(updatedAuthor);
    } catch (err) {
      res
        .status(400)
        .json({ error: 'error al actualizar', details: err.message });
    }
  };

  exports.deleteAuthor = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'ID no válido' });
    s;
    try {
      const deleteAuthor = await authorModel.findByIdAndDelete(id);
      if (!deleteAuthor)
        return res.status(404).json({ error: 'No encontrado' });
      res.status(200).json({ message: 'Autor eliminado correctamente' });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Error al eliminar', details: err.message });
    }
  };

  exports.assignBooks = async (req, res) => {
    const { id, relatedID } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(relatedID)
    )
      return res.status(400).json({ error: 'Id no válido' });
    try {
      const author = await authorModel.findById(id);
      if (!author)
        return res.status(404).json({ error: 'autor no encontrado' });
      if (author.relations.includes(relatedID))
        return res.status(400).json({ error: 'Ya está asignado' });
      author.relations.push(relatedID);
      await doc.save();
      res.status(200).json({ message: 'Libro asignado correctamente', doc });
    } catch (err) {
      res.status(500).json({ error: 'Error al asignar', details: err.message });
    }
  };
};
