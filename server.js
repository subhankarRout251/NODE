const express = require("express");
const app = express();
const db = require("./db");
// Modify the data in JSON
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const passport = require("./auth");
const Person = require("./models/Person");
const Menu = require("./models/Menu");

const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} ${req.originalUrl}`);
  next();
};

app.use(passport.initialize());

app.use(logRequest);

const localMidelwire = passport.authenticate("local", { session: false });

app.get("/", localMidelwire, function (req, res) {
  res.send("Hello World");
});

// Routes for Person
const personRoutes = require("./router/personRouter");
app.use("/person", personRoutes);

// Routes for Menu
const menuRoutes = require("./router/menuRouter"); // Corrected import

app.use("/menu", localMidelwire, menuRoutes); // Corrected mounting

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

module.exports = db;
