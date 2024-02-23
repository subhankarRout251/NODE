const mongoose = require("mongoose");
//Define the MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/hotels";
//set Up MonDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Get the default  Connection
//MonDb maintains a default connection objects representing the MonDB connection
const db = mongoose.connection;

//Event Listeners for DB connection
db.on("connected", () => {
  console.log("connection succesfull");
});

db.on("error", (err) => {
  console.log("Error: ", err);
});

db.on("disconnected", () => {
  console.log("connection Disconnect");
});

//Export the DB
module.exports = db;
