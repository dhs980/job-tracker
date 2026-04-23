import { User } from "../model/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email).select("+password");
  if (!user) return res.status(400).json({ message: "invalid credential" });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "invalid credential" });
  const token = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();
  await User.findByIdAndUpdate(user._id, {
    lastLogin: new Date(),
  });
  await user.save({ validateBeforeSave: false });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ message: "loginsuccessful", token });
});

export const signUpUser = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    loginType: "local",
  });
  const token = newUser.generateAuthToken();
  const refreshToken = newUser.generateRefreshToken();
  await User.findByIdAndUpdate(newUser._id, {
    lastLogin: new Date(),
  });
  await newUser.save({ validateBeforeSave: false });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    status: "success",
    newUser,
    token,
  });
});

export const refresh = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);
  const user = await User.findOne({ _id: decoded.id, refreshToken });
  if (!user) {
    return res.status(404).json({ message: "token is invalid or not in DB" });
  }

  if (user.refreshTokenExipry < new Date()) {
    user.refreshToken = undefined;
    user.refreshTokenExipry = undefined;
    await user.save({ validateBeforeSave: false });

    return res
      .status(403)
      .json({ message: "Refresh token expired.please login" });
  }
  const newAccessToken = user.generateAuthToken();
  const newRefreshToken = user.generateRefreshToken();
  await user.save({ validateBeforeSave: false });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    status: "success",
    token: newAccessToken,
  });
});
