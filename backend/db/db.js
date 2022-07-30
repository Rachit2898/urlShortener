const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected on ${process.env.DB_URI}`);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};
module.exports = connectDatabase;
