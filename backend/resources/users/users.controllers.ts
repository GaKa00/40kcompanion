import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";
import { Request, Response } from "express";
import { sendPasswordResetEmail } from "../../middleware/nodermailer";

require("dotenv").config(); 
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const jwt = require("jsonwebtoken");


const prisma = new PrismaClient();
const app = express();

app.use(express.json());


//typing for updating readinglist bookentries

interface ReadingListUpdate {
  isFinished?: boolean;
  isReading?: boolean;
  rating?: number;
  quotes?: string[]
  summary?: string;
}

/**
 * @description register user
 * @route GET /users/:id
 */


export function verifyToken(req: Request, res: Response) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ isValid: false });
  }

  const secretKey = process.env.JWT_SECRET;
  jwt.verify(token, secretKey, (error: any, user: any) => {
    if (error) {
      return res.status(403).json({ isValid: false });
    }
    res.json({ isValid: true, user });
  });
}

//takes user details from body, then creates new user and grants an userid.
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


//delete user

export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//log in registered user
//also creates an user token for other functionality which require authentication
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
      expiresIn: "7d",
    };

    const token = jwt.sign(payload, secretKey, options);
    res.json({ token, userId: user.id });
  } catch (error) {
    console.error(error); 

    
  }
  
}
 //gets the active user if userdata is needed (as per profile page)
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
      const parsedUserId = Number(userId);
    
      
      if (req.user?.userId !== parsedUserId) {
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
    const {isReading, isFinished} =req.body;
    let parsedReadingListId = Number(readingListId);
    const parsedUserId = Number(userId);
    if (req.user?.id!== parsedUserId) {
      return res.status(403).json({ message: "Access forbidden" });
    }

 try {
  const updatedBookStatus = await prisma.readingList.update({
    where: { id: parsedReadingListId },
    data: { isReading, isFinished },
  })
     res.json(updatedBookStatus);
  
 } catch (error) {
   console.error("Error updating book status:", error);
   res.status(500).json({ error: "Internal Server Error" });
  
 }
    


   


}


// if uid and readinglistid are defined, they will be parsed, then checked for comparison
//if it suceedds, data sent from frontend will be replacing previous data already existing in backend (204-220)
export async function updateSummaryInReadinglist(req: Request, res: Response) {


  const { userId, readingListId } = req.params;
  const { summary } = req.body;

  console.log(
    `User ID: ${userId}, Reading List ID: ${readingListId}, Summary: ${summary}`
  );

  const parsedReadingListId = parseInt(readingListId, 10);
  const parsedUserId = parseInt(userId, 10);

  if (isNaN(parsedUserId) || isNaN(parsedReadingListId)) {
    console.log("Invalid userId or readingListId");
    return res.status(400).json({ message: "Invalid userId or readingListId" });
  }

  if (req.user?.id !== parsedUserId) {
    console.log("Access forbidden: user is not authorized");
    return res.status(403).json({ message: "Access forbidden" });
  }

  const data: any = {};
  if (summary !== undefined) data.summary = summary;

  try {
    const updatedReadingList = await prisma.readingList.update({
      where: { id: parsedReadingListId },
      data,
    });
    console.log("Updated reading list:", updatedReadingList);
    res.json(updatedReadingList);
  } catch (error) {
    console.error("Error updating reading list:", error);
    res.status(400).json({ error: (error as Error).message });
  }
}


export async function updateQuotesInReadinglist(req: Request, res: Response) {
  const { userId, readingListId } = req.params;
  const { newQuote } = req.body;

  console.log("Received newQuote:", newQuote);

  if (!userId || !readingListId) {
    return res.status(400).json({ message: "Missing userId or readingListId" });
  }

  const parsedUserId = Number(userId);
  const parsedReadingListId = Number(readingListId);

  if (isNaN(parsedUserId) || isNaN(parsedReadingListId)) {
    return res.status(400).json({ message: "Invalid userId or readingListId" });
  }

  if (req.user?.id !== parsedUserId) {
    return res.status(403).json({ message: "Access forbidden" });
  }

  try {
    const updatedReadingList = await prisma.readingList.update({
      where: { id: parsedReadingListId },
      data: {
        quotes: {
          push: newQuote,
        },
      },
    });

    res.json(updatedReadingList);
  } catch (error) {
    console.error("Error updating quotes:", error);
    res.status(400).json({ error: (error as Error).message });
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

export async function sendPWRMail(req: Request, res: Response){
  const { email } = req.body;

  // Check if the user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resetToken = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "30min",})
  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

  try{
    await sendPasswordResetEmail(user.email,  resetLink);
    res.status(200).json({ message: "Reset link sent to your email" });
  }
  catch(error){
    console.error("Error sending password reset email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      email: string;
    };
    const { email } = decoded;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database using Prisma
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};




