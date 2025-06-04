import express from "express";
const router = express.Router();

import { getBooks, getBooksByTags, searchBooks } from "./books.controllers";
// getBookById,
// GET books: Retrieve a list of all books.
// GET books/:id: Retrieve details of a specific book.

router.get("/", getBooks);
router.get("/searchByTags", getBooksByTags);
// router.get("/books/:id", getBookById);
router.post("/search", searchBooks);

export default router;
