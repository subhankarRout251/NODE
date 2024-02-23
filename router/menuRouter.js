const express = require("express");
const router = express.Router();
const Menu = require("./../models/Menu");
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    //create new menu Data
    const newMenu = new Menu(data);
    //Save the data
    const response = await newMenu.save();
    console.log("data saved:", response); // Log the saved data
    res.status(200).json(response);
  } catch (err) {
    console.error("Error saving data:", err); // Log the error
    res.status(500).json({ error: err.message }); // Send error message in response
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("data Fetch");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:teast", async (req, res) => {
  try {
    const teastType = req.params.teast;
    if (teastType == "sweet" || teastType == "spicy" || teastType == "sour") {
      const responce = await Menu.find({ teast: teastType });
      console.log("responce fetched");
      res.status(200).json(responce);
    } else {
      res.status(400).json({ error: "Invalid teastType" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const MenuId = req.params.id;
    const updatedMenuData = req.body;
    const responce = await Menu.findByIdAndUpdate(MenuId, updatedMenuData, {
      new: true,
      runValidators: true,
    });
    if (!responce) {
      return res.status(404).json({ error: err.message });
    }
    console.log("data update");
    res.status(200).json(responce);
  } catch (err) {
    console.log("uncuccessfull");
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const MenuId = req.params.id;
    const responce = await Menu.findByIdAndDelete(MenuId);
    if (!responce) {
      return res.status(404).json({ error: err.message });
    }
    console.log("person deleted");
    res.status(200).json({ error: err.message });
  } catch (err) {
    console.log("issue in delete part");
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
