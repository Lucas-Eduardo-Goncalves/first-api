import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import "./database";
import "./shared/container";

import { router } from "./routes";
import { AppError } from "./errors/AppErrors";

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, _: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error - something went wrong",
  });
});

app.listen(3333, () => console.log("Server is running!!"));
