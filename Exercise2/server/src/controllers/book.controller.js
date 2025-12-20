// src/controllers/book.controller.js
const Book = require("../models/Book");

// GET all books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// GET single book by id (π.χ. B101)
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findOne({ id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// CREATE new book
const createBook = async (req, res, next) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    next(error);
  }
};

// UPDATE book by id
const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// DELETE book by id
const deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await Book.findOneAndDelete({ id: req.params.id });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
