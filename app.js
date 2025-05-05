require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Libros y autores');
});


const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');


app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado efectivamente....');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar:', err.message);
  });
