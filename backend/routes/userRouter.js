import express from "express";

const Router = express.Router();

Router.route("/").get().post();
Router.route("/:id").patch().delete();

export default Router;
