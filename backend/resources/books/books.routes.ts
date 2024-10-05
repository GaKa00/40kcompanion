
import express from "express";
const router = express.Router();

import { getBooks, getBooksByTags } from "./books.controllers";
// getBookById,
  // GET books: Retrieve a list of all books.
  // GET books/:id: Retrieve details of a specific book.

  router.get("/books", getBooks);
// router.get("/books/:id", getBookById);
router.get("/books/searchByTags", getBooksByTags);

export default router