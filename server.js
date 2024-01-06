const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const route = require("./routes");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection succesfull."));

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(5000, () => {
  console.log("Backend server is running.");
});
