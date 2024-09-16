import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();


//Typing for auth
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: number };
    }
  }
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
  
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("Missing JWT_SECRET in environment");
  }

 

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
    
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    
    req.user = user as JwtPayload & { id: number };
    next();
  });
}