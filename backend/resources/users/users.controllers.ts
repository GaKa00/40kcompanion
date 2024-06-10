import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";

const JWT_SECRET = "jebediah";

import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());



/**
 * @description register user
 * @route GET /users/:id
 */

export async function register (req,res)  {
  const  {username, email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {username,
      email,
      password:hashedPassword}
    });
    res.status(201).json('User registered')
    
    if(!user){
      res.status(401).json({message: 'registration failed'})
    }

  } catch (error) {

    
  }
}

//log in registered user

  export async function login (req, res) {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

 const token = jwt.sign({userid: user.id, username: user.username}, JWT_SECRET)
 res.json({token})
}



//Get reading list from active user


export async function getReadingList() {
  app.get("/users/:userId/reading-list", authenticateToken, async (req, res) => {
    const { userId } = req.params;
    
    if (req.user.userId !== userId) {
      return res.status(403).json({ message: "Access forbidden" });
    }
    
    const readingList = await prisma.readingList.findMany({
      where: { userId },
      include: { book: true },
    });
    res.json(readingList);
  });
}

export async function deleteBookFromReadinglist(){

  app.delete(
    "/users/:userId/reading-list/:readingListId",
    authenticateToken,
    async (req, res) => {
      const { userId, readingListId } = req.params;
      
      if (req.user.userId !== userId) {
        return res.status(403).json({ message: "Access forbidden" });
      }
      
      try {
        await prisma.readingList.delete({ where: { id: readingListId } });
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );
}

// Update book in reading list

export async function updateBookInReadinglist(){

  app.put(
    "/users/:userId/reading-list/:readingListId",
    authenticateToken,
    async (req, res) => {
      const { userId, readingListId } = req.params;
      const { status, rating, quotes, summary } = req.body;
      
      if (req.user.userId !== userId) {
        return res.status(403).json({ message: "Access forbidden" });
      }
      
      try {
        const updatedReadingList = await prisma.readingList.update({
          where: { id: readingListId },
          data: { isFinished, isReading, rating, quotes, summary },
        });
        res.json(updatedReadingList);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );
  
}
 //add book to active users reading list

 export async function addBookToReadinglist() {

   app.post("/users/:userId/reading-list", authenticateToken, async (req, res) => {
     const { userId } = req.params;
     const { bookId } = req.body;
     
     if (req.user.userId !== userId) {
       return res.status(403).json({ message: "Access forbidden" });
      }
      
      try {
        const readingList = await prisma.readingList.create({
          data: {
            userId,
            bookId,
          },
        });
        res.status(201).json(readingList);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
  }
    


  

