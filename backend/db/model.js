const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  original_url: String,
  short_url: String,
  created_on: {
    type: Date,
    default: Date.now(),
  },
  clicks: {
    type: Number,
    default: "0",
  },
});

const Urls = mongoose.model("urls", userSchema);

module.exports = Urls;
