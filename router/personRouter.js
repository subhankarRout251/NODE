const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { generateToken } = require("../jwt");
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    //create new person Data
    const newPerson = new Person(data);
    //Save the data
    const response = await newPerson.save();
    console.log("data saved:", response); // Log the saved data
    const token = generateToken(response.username);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.error("Error saving data:", err); // Log the error
    res.status(500).json({ error: err.message }); // Send error message in response
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data Fetch");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager") {
      const responce = await Person.find({ work: workType });
      console.log("responce fetched");
      res.status(200).json(responce);
    } else {
      res.status(400).json({ error: "Invalid workType" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const responce = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
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
    const personId = req.params.id;
    const responce = await Person.findByIdAndDelete(personId);
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
