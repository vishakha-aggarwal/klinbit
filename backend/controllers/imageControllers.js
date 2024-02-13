const Image = require("../models/imageModel");
const catchAsyncError = require("../middleware/catchAysncErrors");
const cloudinary = require("cloudinary");

//uploadImage
exports.uploadImage = catchAsyncError(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "images",
        width: 150,
        crop: "scale",
    });

    const { username } = req.body;
    const image = await Image.create({
        username,
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    })
    res.status(200).json({
        success: true,
        message: "Image uploaded successfully"
    });
});
