const mongoose = require("mongoose");
// const app = require("express");
// const Person = require("../db.js");
//for passoed hashing
const bcrypt = require("bcrypt");

const Personschema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  username: {
    require: true,
    type: String,
    unique: true,
  },
  password: {
    require: true,
    type: String,
  },
});

Personschema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});
Personschema.methods.comparePassword = async function (candicatePassword) {
  try {
    const isMatch = await bcrypt.compare(candicatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

//milu ---> nboishddbfufbif
//login --> entered password

//nboishddbfufbif --> extract salt
//salt+ entered password --> hash --> got a hash string
// then check that hash and this "nboishddbfufbif" same or not

//Create Model
const person = mongoose.model("person", Personschema);
module.exports = person;
