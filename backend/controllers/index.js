
const Urls = require("../db/model");


// Generate short URL
const shortUrlGen = (len) => {
  let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";

  for (let i = 0; i < len; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return key;
};

exports.createShortUrl =async (req, res) => {
  let response = {
    original_url: req.body.url,
    short_url: shortUrlGen(5),
  };
  if (!response.original_url){
    return res.status(404).json({error: "Invalid"})
  }

  const responses = await Urls.create(response);
  if (!responses) {
    return res.json({
      error: "invalid url",
    });
  } else {
    res.status(200).json({
      success: true,
      successCode: 200,
      responses,
    });
  }
};

exports.useUrl = async (req, res) => {
  let slug = req.params.slug;
  if (!slug){
    return res.status(404).json({error: "Invalid"})
  }


  const response = await Urls.findOne({
    short_url: slug,
  });

  if (response == null) {
    return res.json({
      error: "invalid url",
    });
  } else {
    return res.redirect(301, response["original_url"]);
  }
};

exports.useClicks = async (req, res) => {
  let slug = req.body.url;

  const response = await Urls.findOne({
    short_url: slug,
  });

  if (response == null) {
    return res.json({
      error: "invalid url",
    });
  } else {
    response.clicks++;
    response.save();
    res.status(200).json({
      success: true,
      successCode: 200,
      response,
    });
  }
};

exports.getAllUrls = async (req, res, next) => {
  const response = await Urls.find();

  if (!response) {
    return res.json({
      error: "No urls",
    });
  }

  res.status(200).json({
    success: true,
    successCode: 200,
    response,
  });
};
