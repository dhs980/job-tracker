import { User } from "../model/userModel";
import { catchAsync } from "../utils/catchAsync";

//user routes
export const getUser = catchAsync(async (req, res) => {
  const user = await User.findByEmail;
});

//admin only routes
export const getAllUser = catchAsync(async (req, res) => {
  const allUser = await User.find({});
  res.status(200).json({
    status: "success",
    allUser,
  });
});
