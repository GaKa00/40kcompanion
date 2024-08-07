import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";
import { Request, Response } from "express";

require("dotenv").config(); 
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const jwt = require("jsonwebtoken");


const prisma = new PrismaClient();
const app = express();

app.use(express.json());



/**
 * @description register user
 * @route GET /users/:id
 */

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User registered", userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//log in registered user
export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

 
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const payload = {
      id: user.id,
      username: user.username,
    };

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined');
    }

    const options = {
      expiresIn: "4h",
    };

    const token = jwt.sign(payload, secretKey, options);
    res.json({ token, userId: user.id });
  } catch (error) {
    console.error(error); // Log the error for debugging

    
  }
  
}
 
export async function getUser(req:Request, res:Response) {
  const { id: userId } = req.params;
  const parsedUserId = Number(userId);

  if (req.user?.id !== parsedUserId) {
    return res
      .status(403)
      .json({ message: "Access forbidden, userId does not match" });
  }

  try {
    const activeUser = await prisma.user.findUnique({
      where: { id: parsedUserId },
    });

    if (!activeUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(activeUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//Get reading list from active user



export async function getUserReadingList(req: Request, res: Response) {
  const { id: userId } = req.params;
  const parsedUserId = Number(userId);

  if (req.user?.id !== parsedUserId) {
    return res.status(403).json({ message: "Access forbidden" });
  }

  try {
    const readingList = await prisma.readingList.findMany({
      where: { userId: parsedUserId },
      include: { book: true },
    });
    res.status(200).json(readingList);
  } catch (error) {
    console.error("Error fetching reading list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



export async function deleteBookFromReadinglist(req:Request, res:Response){
      const { userId, readingListId } = req.params;
      let parsedReadingListId = Number(readingListId);
    
      
      if (req.user?.userId !== userId) {
        return res.status(403).json({ message: "Access forbidden" });
      }
      
      try {
        await prisma.readingList.delete({ where: { id:parsedReadingListId  } });
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: error });
      }
    }
  


// Update book in reading list

export async function updateBookInReadinglist(req: Request, res: Response) {
  const { userId, readingListId } = req.params;
  const parsedReadingListId = Number(readingListId);
  const { isFinished, isReading, rating, quotes, summary } = req.body;

  if (req.user?.id !== Number(userId)) {
    return res.status(403).json({ message: "Access forbidden" });
  }

  try {
    const updatedReadingList = await prisma.readingList.update({
      where: { id: parsedReadingListId },
      data: { isFinished, isReading, rating, quotes, summary },
    });
    res.json(updatedReadingList);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
}

 //add book to active users reading list

 export async function addBookToReadinglist(req: Request, res: Response) {
   const { id: userId } = req.params;
   const { bookId } = req.body;
   const parsedUserId = Number(userId);
   const parsedBookId = Number(bookId);

   console.log("req.user:", req.user);
   console.log("parsedUserId:", parsedUserId);

   if (req.user?.id !== parsedUserId) {
    console.log("Access forbidden:", req.user?.id, "!==", parsedUserId);
     return res.status(403).json({ message: "Access forbidden" });
   }

   try {
     const newEntry= await prisma.readingList.create({
       data: {
         userId: parsedUserId,
         bookId: parsedBookId,
         isFinished: false,
         isReading: true,
       },
     });
     res.status(201).json(newEntry);
   } catch (error) {
     console.error(error);
     res.status(400).json({ error: error });
   }
 }

  

