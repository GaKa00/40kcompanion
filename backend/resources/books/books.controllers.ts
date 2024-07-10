import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import express from "express";




const prisma = new PrismaClient();
const app = express();
app.use(express.json());



export async function getBooks(req: Request, res: Response) {
  const books = await prisma.book.findMany();
   res.json(books);
}


export async function getBookById(req: Request, res: Response) {
    const {id} = req.body
  const TargetBook = await prisma.book.findUnique({ where: { id } });
 res.json(TargetBook);
}

export async function getBooksByTags(req: Request, res: Response) {
  const { tags } = req.body;

 
  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
    return res.status(400).json({ error: "Tags must be an array of strings" });
  }

  try {
  
    const books = await prisma.book.findMany({
      where: {
        tags: {
          hasSome: tags,
        },
      },
    });

    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching books" });
  }
}