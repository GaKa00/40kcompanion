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

// export async function getBookById(req: Request, res: Response) {
//   const id = Number(req.params.id);

//   const TargetBook = await prisma.book.findUnique({
//     where: { id },
//   });

//   if (!TargetBook) {
//     return res.status(404).json({ error: "Book not found" });
//   }

//   res.json(TargetBook);
// }

export async function getBooksByTags(req: Request, res: Response) {
  const tag = req.query.tag;

  if (!tag) {
    const books = await prisma.book.findMany();
    return res.json(books);
  }

  if (typeof tag !== "string") {
    return res.status(400).json({ error: "Tag must be a string" });
  }

  try {
    const books = await prisma.book.findMany({
      where: {
        tags: {
          has: tag,
        },
      },
    });

    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching books" });
  }
}
export async function searchBooks(req: Request, res: Response) {
  const { searchQuery } = req.body;
  try {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            author: {
              contains: searchQuery,
              mode: "insensitive", // Case-insensitive search
            },
          },
        ],
      },
    });
    res.json(books);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Error performing search" });
  }
}
