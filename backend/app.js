import express from "express";
import cros from "cors";
import passport from "passport";

import AppError from "./utils/appError.js";
import { gobalErrorHandler } from "./controller/errorController.js";
import authRouter from "./routes/authRouter.js";
import { protect } from "./middleware/authMiddleware.js";
// import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import cookieParser from "cookie-parser";
import "./config/passport.js";

const app = express();

app.use(
  cros({
    origin: process.env.Domain || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/application", protect, applicationRouter);
// app.use("/user", protect, userRouter);
app.all(/.*/, (req, res, next) => {
  next(new AppError(`can't find this ${req.originalUrl} on this server`, 404));
});
app.use(gobalErrorHandler);
export default app;
