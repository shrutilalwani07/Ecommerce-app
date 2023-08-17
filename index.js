const express = require("express");
const app = express(); //call
require("dotenv").config();
require("./models/config");

const mainRouter = require("./routes/mainRouter");

app.use(express.json()); //json : javascript object notation

app.use("/", mainRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

module.exports = server;

