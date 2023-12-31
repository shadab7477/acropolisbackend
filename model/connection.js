import mongoose from "mongoose";

const url = process.env.DATABASE;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB has been connected successfully");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

connection.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});

connection.on("reconnected", () => {
  console.log("MongoDB connection reconnected");
});

process.on("SIGINT", () => {
  connection.close(() => {
    console.log("MongoDB connection closed due to application termination");
    process.exit(0);
  });
});
