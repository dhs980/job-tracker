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
import { FRONTEND_URLS } from "./utils/runtimeConfig.js";

const app = express();
const allowedOrigins = new Set(FRONTEND_URLS);

app.use(
  cros({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new AppError("Not allowed by CORS", 403));
    },
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.get("/", (req, res) => {
  res.status(200).send("Backend is running");
});
app.use("/auth", authRouter);
app.use("/application", protect, applicationRouter);
// app.use("/user", protect, userRouter);
app.all(/.*/, (req, res, next) => {
  next(new AppError(`can't find this ${req.originalUrl} on this server`, 404));
});
app.use(gobalErrorHandler);
export default app;
