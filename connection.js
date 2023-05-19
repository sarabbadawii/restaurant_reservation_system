const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reservation_system",
  port :"3306"
});

connection.connect((err) => {
  if (err) {
    console.error("Connection error");
    return;
  }
  console.log("Connect to mysql");
});

module.exports = connection;
