
import express from "express";
const router = express.Router();

import { getBooks, getBookById } from "./books.controllers";

// GET books: Retrieve a list of all books.
// GET books/:id: Retrieve details of a specific book.


router.get("/books", getBooks)
router.get("/books/:id", getBookById);

export default router