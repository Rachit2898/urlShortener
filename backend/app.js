const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

// Config

app.use(cors(), express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Route Imports

const urls = require("./routes/index");

app.use("/api/v1", urls);

module.exports = app;
