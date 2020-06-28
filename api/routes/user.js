const express = require("express");
const router = express.Router();

const mysqlconnection = require("../../connection");

var user = { name: "", password: "" };

//GET Method
router.get("/", (req, res, next) => {
  var sql = "SELECt password FROM user WHERE name=?";
  mysqlconnection.query(sql, [user.name], function (error, rows, fileds) {
    if (!error) {
      if (rows.length > 0) {
        if (user.password == rows[0].password) {
          res.status(200).json({
            registered: true,
            authenticated: true,
          });
        } else {
          res.status(200).json({
            registered: true,
            authenticated: false,
          });
        }
        //user.name = "";
        //user.password = "";
        //res.send(rows[0].password);
      } else {
        console.log("No Result found!");
        res.status(400).json({
          registered: false,
          authenticated: null,
        });
      }
    } else {
      console.log(error);
      throw error;
    }
  });
  //res.send({ User_Name: userName });
});

//POST Method
router.post("/", (req, res, next) => {
  user.name = req.body.userName;
  user.password = req.body.password;
  //console.log(req.body);
  res.status(200).json({
    message: "POST working!",
    User_Name: user.name,
    password: user.password,
  });
});

//PUT Method(for partial update)
router.put("/", (req, res, next) => {
  res.status(200).json({
    message: "PUT working!",
  });
});

//PATCH Method(for partial update)
router.patch("/", (req, res, next) => {
  res.status(200).json({
    message: "PATCH working!",
  });
});

//DELETE Method
router.delete("/", (req, res, next) => {
  res.status(200).json({
    message: "DELETE working!",
  });
});

module.exports = router;
