const BookService = require('./book.service')

const bookController = module.exports;
let books = [
  {
    "title": "FSD",
    "author": "Kirshna",
    "publishedYear": "2024"
  }
];

bookController.getAllBooks = async (req, res) => {
  try {
    const result = await BookService.getAllBooks();
    return res.status(200).json(result)
  } catch (error) {
    console.error('Error in getAllBooks', error);
    return res.status(501).json(error)
  }
};

bookController.getSpecificBook = (req, res) => {
  try {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    return res.json(book);
  } catch (error) {
    console.error('Error in getSpecificBook', error);
    return res.status(501).json(error)
  }
}

bookController.createBook = async (req, res) => {
  try {
    const findTitle = await BookService.getAllBooks({ title: req.body.title });

    if (findTitle.length) return res.status(500).json({ 'message': 'book title already exists' })

    const result = await BookService.insertBook(req.body);
    return res.json(result)
  } catch (error) {
    console.error('Error in getSpecificBook', error);
    return res.status(501).json({ message: 'Error', error })
  }
}