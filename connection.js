const mysql = require("mysql");

//setting up connection var
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "U14ec030324@",
  database: "user",
  multipleStatements: true,
});

//connecting to DB
mysqlConnection.connect((error) => {
  if (!error) {
    console.log("Connected!");
  } else {
    console.log(error);
    console.log("Connection Failed!");
  }
});

module.exports = mysqlConnection;
