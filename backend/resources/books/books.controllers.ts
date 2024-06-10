import { PrismaClient } from "@prisma/client";

import express from "express";

const JWT_SECRET = "jebediah";


const prisma = new PrismaClient();
const app = express();
app.use(express.json());



export async function getBooks(req, res){
    const books = prisma.book.findMany()
    await res.json(books)
}


export async function getBookById(req, res) {
    {id} = req.body
    const TargetBook = prisma.book.findUnique({ where: {id}})
    await res.json(TargetBook)
}