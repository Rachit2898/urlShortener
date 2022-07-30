const connectDatabase = require("./db/db");
const PORT = process.env.PORT;

// const express = require("express");
const app = require("./app");

// Connecting to database
connectDatabase();

const server = app.listen(PORT, () => {
  console.log(`listening on port:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
