import express from "express";
import * as authController from "../controller/authController.js";
import passport from "passport";
import { isGoogleOAuthConfigured } from "../config/passport.js";
import { FRONTEND_URL, isProduction } from "../utils/runtimeConfig.js";

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
    failureRedirect: `${FRONTEND_URL}/login`,
  }),
  async (req, res) => {
    const token = req.user.generateAuthToken();
    const refreshToken = req.user.generateRefreshToken();
    await req.user.save({ validateBeforeSave: false });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${FRONTEND_URL}/oauth-success?token=${encodeURIComponent(token)}`);
  },
);

export default Router;
