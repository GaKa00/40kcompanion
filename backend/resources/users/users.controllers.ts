import { PrismaClient } from "@prisma/client";
import  bcrypt from "bcrypt";
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
    

  } catch (error) {
    
  }
}



  export async function login (req, res) {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

 const token = jwt.sign({userid: user.id, username: user.username}, JWT_SECRET)
 res.json({token})
}

export async function logout(req,res) {

}







  

