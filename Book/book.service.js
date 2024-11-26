const BookModel = require('./book.model');

const BookService = module.exports;

BookService.getAllBooks = async (params) => await BookModel.find(params);

BookService.insertBook = async (params) => await BookModel.create(params);