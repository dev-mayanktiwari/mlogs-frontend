import express, { Application, NextFunction, Request, Response } from "express";

import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";

import httpError from "./utils/httpError";
import helmet from "helmet";
import checkupRouter from "./router/checkupRouter";
import authRouter from "./router/authRouter";
import { EResponseMessage } from "./constant/responseMessage";

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/admin/auth", authRouter);
app.use("/api/v1/admin/checkup", checkupRouter);
app.use("/api/v1/admin/blog", blogRouter);

//404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error(EResponseMessage.NOT_FOUND);
  } catch (error) {
    httpError(next, error, req, 404);
  }
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;

