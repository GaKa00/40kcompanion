import express from "express";

// Import handlers  from users.controller.js
import {

  login,
  register,
} from "./users.controllers.js";

const router = express.Router();



// CRUD for auth

router.post("/register", register);  // register a new user
router.post("/login", login);               // login an existing user



// CRUD for users
router.get("/users/:id/reading-list") // get the reading list of an active user
router.post("/api/users/:id/reading-list") // post a book to an active users reading list
router.put("/api/users/:id/reading-list/:book_id") //update changeable info about a book in an active users reading list
router.delete ("/api/users/:id/reading-list/:book_id") //Remove a book from a users reading list

export default router;
