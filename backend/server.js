import dotenv from "dotenv";
import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("uncaught Exception shutting down");
  process.exit(1);
});

dotenv.config({ path: "./.env" });

const { default: app } = await import("./app.js");

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace("PASSWORD", process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => console.log("db connected"));
const server = app.listen(port, () => {
  console.log("listening to port", port);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled rejection shutting down");
  server.close(() => {
    process.exit(1);
  });
});
