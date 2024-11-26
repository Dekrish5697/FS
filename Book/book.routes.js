const express = require('express');
const bookController = require('./book.controller')
const app = express.Router();

let books = [];

// GET all books
app.get('/', bookController.getAllBooks);

// GET a specific book by ID
app.get('/:id', bookController.getSpecificBook);

// POST a new book
app.post('/', bookController.createBook);

// PUT (update) an existing book
app.put('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

// DELETE a book by ID
app.delete('/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook);
});

module.exports = app;