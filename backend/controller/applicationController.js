import { Application } from "../model/applicationModel.js";

import { catchAsync } from "../utils/catchAsync.js";

export const statuses = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const uniqueStatus = await Application.distinct("status", { user: userId });
  const defaults = ["Applied", "Rejected", "Selected", "Interview", "HR Round"];

  const finalStauses = [...new Set([...uniqueStatus, ...defaults])];
  res.status(200).json(finalStauses);
});

export const createJobTracker = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const jobTracker = await Application.create({ ...req.body, user: userId });
  res.status(201).json(jobTracker);
});

export const getUserJobTrackers = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;
  const userJobs = await Application.find({ user: userId }).sort({
    createdAt: -1,
  });
  res.status(200).json({ userJobs, userRole });
});

export const deleteJobTracker = catchAsync(async (req, res) => {
  const id = req.params.id;
  await Application.deleteOne({ _id: id });
  res.status(200).json({ message: "Job deleted" });
});
export const editJobTracker = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  await Application.findOneAndUpdate(
    { _id: id, user: userId },
    { $set: req.body },
    { runValidators: true },
  );

  res.status(200).json({ message: "Job updated" });
});
