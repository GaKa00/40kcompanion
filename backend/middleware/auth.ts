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
    console.log("No token provided"); // Logs missing token
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("Missing JWT_SECRET in environment");
  }

  console.log("Token provided:", token); // Logs received token

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error("Token verification error:", err); // Logs token verification error
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    console.log("Authenticated user:", user); // Logs authenticated user details
    req.user = user as JwtPayload & { id: number };
    next();
  });
}