const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAysncErrors");
const sendToken = require("../utils/jwtToken");

//register user
exports.registerUser = catchAsyncError(async (req, res, next) => {

    console.log(req);
    const { name, email, password } = req.body;
    console.log(name);
    const user = await User.create({
        name,
        email,
        password
    })
    //storing token in cookie
    sendToken(user, 201, res);
})

//login
exports.loginUser = async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password)
        return next(new ErrorHandler("Please Enter Email & Password", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user)
        return next(new ErrorHandler("Invalid email or password", 401));

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched)
        return next(new ErrorHandler("Invalid email or password", 401));

    //storing token in cookie
    sendToken(user, 200, res);
}

//logout
exports.logout = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    
    res.status(200).json({
        success: true,
        message: "Logged Out Successfully",
    });
});

// Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
        success: true,
        user,
    });
});