import express from "express";
import * as applicationController from "../controller/applicationController.js";

const Router = express.Router();

Router.route("/status").get(applicationController.statuses);
Router.route("/job")
  .get(applicationController.getUserJobTrackers)
  .post(applicationController.createJobTracker);
Router.route("/:id")
  .delete(applicationController.deleteJobTracker)
  .patch(applicationController.editJobTracker);

export default Router;
