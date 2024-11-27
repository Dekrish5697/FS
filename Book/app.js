const express = require('express');
const app = express();
const port = 3000;
const BookModel = require('./book.model')
const mongoose = require('mongoose');
app.use(express.json());

let books = [];
// Logger middleware to log request details
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next(); // pass control to the next handler
  });
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

  const middleware = (req, res, next) => {
    next()
  }

  app.get ('/books', async (req, res) => {
    const result = await BookModel.find();
    res.json(result)
  });

  app.get('/books/:id', middleware, (req,res) => {
    const book = book.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(result);

    
  });