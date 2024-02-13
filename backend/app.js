const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

const corsOptions = {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};
const errormiddleware = require("./middleware/error");
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


if(process.env.NODE_ENV!=="PRODUCTION")
  require("dotenv").config({path:"backend/config/config.env"});

const user = require("./routes/userRoutes");
const images = require("./routes/imageRoutes");

app.use("/api/v1", user);
app.use("/api/v1", images);
app.use(errormiddleware);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app