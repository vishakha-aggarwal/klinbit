const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { uploadImage } = require("../controllers/imageControllers");
const router = express.Router();

router.route("/uploadImage").post(isAuthenticatedUser, uploadImage);

module.exports = router;