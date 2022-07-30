const express = require("express");
const { createShortUrl,useUrl,getAllUrls,useClicks } = require("../controllers/index");
const { checkHTTP } = require("../middleware/index");
const router = express.Router();

router.route("/createUrl").post(checkHTTP,createShortUrl);
router.route("/shortUrl/:slug").get(useUrl);
router.route("/getAllUrls").get(getAllUrls)



module.exports = router;
