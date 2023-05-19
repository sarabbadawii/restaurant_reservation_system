const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const admin = require("./routes/adminRoutes");
const customer = require("./routes/customerRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("", admin);
app.use("", customer);

app.listen(5000, "localhost", (err) => {
  console.log(err);
  console.log("server listening on port 5000");
});
