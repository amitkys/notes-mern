import dotenv from "dotenv";
import express, { Request, Response } from "express";
const app = express();
dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.render("hello");
});

app.listen(process.env.PORT, () => {
  console.log(`server is live on ${process.env.PORT}`);
});
