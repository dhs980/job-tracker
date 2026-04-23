import express from "express";
import * as authController from "../controller/authController.js";
import passport from "passport";
import { isGoogleOAuthConfigured } from "../config/passport.js";

const Router = express.Router();
const requireGoogleOAuth = (req, res, next) => {
  if (!isGoogleOAuthConfigured) {
    return res.status(503).json({
      message: "Google OAuth is not configured",
    });
  }

  next();
};

Router.route("/login").post(authController.loginUser);
Router.route("/signup").post(authController.signUpUser);
Router.route("/refresh").post(authController.refresh);
Router.get(
  "/google",
  requireGoogleOAuth,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
Router.get(
  "/google/callback",
  requireGoogleOAuth,
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  async (req, res) => {
    const token = req.user.generateAuthToken();
    const refreshToken = req.user.generateRefreshToken();
    await req.user.save({ validateBeforeSave: false });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(
      `http://localhost:5173/oauth-success?token=${encodeURIComponent(token)}`,
    );
  },
);

export default Router;
