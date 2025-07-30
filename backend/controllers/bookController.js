import asyncHandler from 'express-async-handler';
import Book from '../models/BookModel.js';

// @desc    Fetch all books
// @route   GET /api/books
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Private
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const { title, author, isbn, publicationDate, genre, copies } = req.body;
  const book = new Book({
    title,
    author,
    isbn,
    publicationDate,
    genre,
    copies,
    availableCopies: copies,
  });
  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = asyncHandler(async (req, res) => {
  const { title, author, isbn, publicationDate, genre, copies } = req.body;
  const book = await Book.findById(req.params.id);

  if (book) {
    book.title = title;
    book.author = author;
    book.isbn = isbn;
    book.publicationDate = publicationDate;
    book.genre = genre;
    book.copies = copies;
    // Recalculate available copies if total copies change
    // Note: A more complex logic would be needed if loans are active
    book.availableCopies = copies - (book.copies - book.availableCopies);

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await book.deleteOne();
    res.json({ message: 'Book removed' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

export { getBooks, getBookById, createBook, updateBook, deleteBook };