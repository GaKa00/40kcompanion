import express from "express";
import {
  addBookToReadinglist,
  deleteBookFromReadinglist,
  getReadingList,
  login,
  register,
  updateBookInReadinglist,
} from "./users.controllers";
import { auth } from "../../middleware/auth";

const router = express.Router();

// CRUD for auth
router.post("/register", register); // register a new user
router.post("/login", login); // login an existing user

// CRUD for users
router.get("/users/:id/reading-list", auth, getReadingList); // get the reading list of an active user
router.post("/users/:id/reading-list", auth, addBookToReadinglist); // post a book to an active user's reading list
router.put(
  "/users/:id/reading-list/:readingListId",
  auth,
  updateBookInReadinglist
); // update a book in an active user's reading list
router.delete(
  "/users/:id/reading-list/:readingListId",
  auth,
  deleteBookFromReadinglist
); // remove a book from an active user's reading list

export default router;
