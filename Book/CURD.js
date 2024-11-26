const express = require('express');
// Initialize the app
const app = express();
// Define a port
const port = 3001;
app.use(express.json());
let books = [10];
// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET a specific book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id ===
    parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not');
  res.json(book);
});

// POST a new book
app.post('/books', (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(book);
  res.status(201).json(book);
});

// PUT (update) an existing book
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id ===
    parseInt(req.params.id));
  if (!book) return res.status(404).send('Book found');
  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id ===
    parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');
  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});