
import express from "express";
const router = express.Router();

import { getBooks, getBookById, getBooksByTags } from "./books.controllers";

// GET books: Retrieve a list of all books.
// GET books/:id: Retrieve details of a specific book.


router.get("/books", getBooks)
router.get("/books/:id", getBookById);
router.get("/books/:id", getBookById);
router.post("/books/searchByTags", getBooksByTags);

export default router