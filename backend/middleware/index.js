
const catchAsyncError = require("./catchAsyncError")

exports.checkHTTP = catchAsyncError((req, res, next) => {

    if (/(http(s?)):\/\//.test(req.body.url)) {
      return next();
    } else {
      return res.json({
        error: "invalid url",
      });
    }
  });