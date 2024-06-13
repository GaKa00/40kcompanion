import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import express from "express";




const prisma = new PrismaClient();
const app = express();
app.use(express.json());



export async function getBooks(req: Request, res: Response) {
  const books = prisma.book.findMany();
  await res.json(books);
}


export async function getBookById(req: Request, res: Response) {
    const {id} = req.body
  const TargetBook = prisma.book.findUnique({ where: { id } });
  await res.json(TargetBook);
}