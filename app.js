const express = require("express");
const app = express();

//Morgan for logging
const morgan = require("morgan");

const userRoutes = require("./api/routes/user");

//bodyparser and multer for fetching data from req body and formData
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static("public"));

//Header attachment to prevent CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE,PATCH,GET");
    return res.status(200).json({});
  }
  next();
});

//Routes to serve requests

app.use("/user", userRoutes);

// app.use("/", (req, res, next) => {
//   res.status(200).json({
//     message: "API working!",
//   });
// });

//Handel error
app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
