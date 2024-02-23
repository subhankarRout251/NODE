const mongoose = require("mongoose");

const Menuschema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  teast: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
    require: true,
  },
  ingredients: {
    type: [String],
    default: [],
  },
});

const menu = mongoose.model("menu", Menuschema);
module.exports = menu;
