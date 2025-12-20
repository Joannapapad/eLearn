// src/routes/book.routes.js
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

// GET all books
router.get("/", bookController.getAllBooks);

// GET book by ID
router.get("/:id", bookController.getBookById);

// CREATE new book
router.post("/", bookController.createBook);

// UPDATE book
router.put("/:id", bookController.updateBook);

// DELETE book
router.delete("/:id", bookController.deleteBook);

module.exports = router;
