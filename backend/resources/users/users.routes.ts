import express from "express";
import {
  addBookToReadinglist,
  deleteBookFromReadinglist,
  getUserReadingList,
  getUser,
  login,
  register,
  updateSummaryInReadinglist,
  deleteUser,
  updateQuotesInReadinglist,
  verifyToken,
  updateBookInReadinglist,
  resetPassword,
  sendPWRMail,
} from "./users.controllers";
import { auth } from "../../middleware/auth";

const router = express.Router();

// CRUD for auth
router.post('verify', auth, verifyToken)
router.post("/register", register); // register a new user
router.post("/login", login); // login an existing user
router.delete("/delete/:id", deleteUser) //deletes an existing user
router.post('/password-reset', sendPWRMail)
router.post("/password-reset/:token", resetPassword);

// CRUD for users and reading list
router.get("/users/:id/reading-list", auth, getUserReadingList); // get the reading list of an active user
router.get("/users/:id", auth, getUser); //get Active User
router.post("/users/:id/reading-list", auth, addBookToReadinglist); // post a book to an active user's reading list
router.put(
  "/users/:userId/reading-list/:readingListId/quote",
  auth,
  updateQuotesInReadinglist
);

router.put(
  "/users/:userId/reading-list/:readingListId/summary",
  auth,
  updateSummaryInReadinglist
); // Update summary

router.put("/users/:userId/reading-list/:readingListId", auth , updateBookInReadinglist);

router.delete(
  "/users/:id/reading-list/:readingListId",
  auth,
  deleteBookFromReadinglist
); // remove a book from an active user's reading list

export default router;
