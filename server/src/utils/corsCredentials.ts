import { NextFunction, Request, Response } from "express";

export const allowedOrigins = [
  "https://www.yoursite.com",
  "http://127.0.0.1:3000",
  "http://localhost:3002",
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
