import { NextFunction, Request, Response } from "express";

export const allowedOrigins = [
  "https://www.yoursite.com",
  "http://localhost:3001",
  "http://localhost:3000",
  "https://pet-care-connect.vercel.app",
];

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin!)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
};
