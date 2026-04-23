import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../model/userModel.js";

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const isGoogleOAuthConfigured = Boolean(clientID && clientSecret);

if (!isGoogleOAuthConfigured) {
  console.warn(
    "Google OAuth disabled: missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET",
  );
} else {
  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email) return done(new Error("Google account email not found"));

          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = await User.findOne({ email });
          }

          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email,
              googleId: profile.id,
              loginType: "google",
            });
          } else if (!user.googleId) {
            user.googleId = profile.id;
            user.loginType = user.loginType || "local";
            await user.save({ validateBeforeSave: false });
          }

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      },
    ),
  );
}
