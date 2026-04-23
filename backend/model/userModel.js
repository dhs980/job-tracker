import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: { type: String, required: [true, "please enter your name"] },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
      lowercase: true,
      validate: { validator: validator.isEmail },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    loginType: { type: String, enum: ["local", "google"], default: "local" },
    password: {
      type: String,
      required: function () {
        return this.loginType === "local";
      },
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: function () {
        return this.loginType === "local";
      },
      validate: {
        validator: function (el) {
          if (this.loginType !== "local") return true;
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    refreshToken: { type: String, default: null },
    refreshTokenExipry: { type: Date },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);
//before saving to db we are updating the confirm password to undefined since it is not needed and hashing the password
userSchema.pre("save", async function () {
  if (!this.password || !this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});
// this needs an instance of the db and it is used to create access token for a user
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.ACCESS_KEY, {
    expiresIn: "10m",
  });
};
userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { id: this._id, role: this.role },
    process.env.REFRESH_KEY,
    {
      expiresIn: "7d",
    },
  );
  this.refreshToken = refreshToken;
  this.refreshTokenExipry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return refreshToken;
};
// this gets the instance of the db and find the user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};
// this function compares the password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); //this.password = mongodb data instances password (the password which is alredy saved). this is taken by the findByEmail
};
userSchema.statics.findByUserId = function (userID) {
  return this.findById({ userID });
};
export const User = mongoose.model("user", userSchema);
