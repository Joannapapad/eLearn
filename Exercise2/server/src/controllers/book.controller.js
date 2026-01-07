const Book = require("../models/Book");

//Returns a list of all books stored in the database.

const getAllBooks = async (req, res, next) => {
  try {
    // Simple query: fetch everything
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    // Pass error to the centralized error handler middleware
    next(error);
  }
};

//Returns a single book based on the custom "id" field 
const getBookById = async (req, res, next) => {
  try {
    // Find by custom id field used in the frontend routes
    const book = await Book.findOne({ id: req.params.id });

    // Return 404 if no matching book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};


//Creates a new book document using request body data.
const createBook = async (req, res, next) => {
  try {
    // Create a new Mongoose document from incoming JSON
    const book = new Book(req.body);

    // Save to database and return the stored object
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    next(error);
  }
};

//Updates an existing book (matched by custom id) and returns the updated version.
 const updateBook = async (req, res, next) => {
  try {
    // Update by custom id field, and return the modified document
    const updatedBook = await Book.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true } // ensures we get the updated document back
    );

    // If nothing was updated, the book doesn't exist
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

 //Deletes a book by custom id and returns a confirmation message.
const deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await Book.findOneAndDelete({ id: req.params.id });

    // If no document was found to delete, return 404
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
  deleteBook,
};
