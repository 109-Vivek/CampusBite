const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Mess, MessAdmin } = require("../db/index");
const zod = require("zod");
const { messAdminJWTSecret } = require("../config");
const { authorizeMessAdmin } = require("../middlewares/messAdmin");

//zod validation schema for the above mess schedule
const scheduleSchema = zod.object({
  Sunday: zod.object({
    breakfast: zod.string(),
    lunch: zod.string(),
    snacks: zod.string(),
    dinner: zod.string(),
  }),
  Monday: zod.object({
    breakfast: zod.string(),
    lunch: zod.string(),
    snacks: zod.string(),
    dinner: zod.string(),
  }),
  Tuesday: zod.object({
    breakfast: zod.string(),
    lunch: zod.string(),
    snacks: zod.string(),
    dinner: zod.string(),
  }),
  Wednesday: zod.object({
    breakfast: zod.string(),
    lunch: zod.string(),
    snacks: zod.string(),
    dinner: zod.string(),
  }),
  Thursday: zod.object({
    breakfast: zod.string(),
    lunch: zod.string(),
    snacks: zod.string(),
    dinner: zod.string(),
  }),
  Friday: zod.object({
    breakfast: zod.string(),
    lunch: zod.string(),
    snacks: zod.string(),
    dinner: zod.string(),
  }),
  Saturday: zod.object({
    breakfast: zod.string(),
    lunch: zod.string(),
    snacks: zod.string(),
    dinner: zod.string(),
  }),
});

//Signin
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const admin = await MessAdmin.findOne({ username });
  if (!admin) {
    res.json("Mess Admin Not Found");
    return;
  } else {
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      res.json("Invalid Username or password");
      return;
    }

    const token = jwt.sign({ username, password }, messAdminJWTSecret);
    res.json({ token });
  }
});

//get the messData of the messAdmin
router.get("/messData", authorizeMessAdmin, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    const username = decoded.username;
    const messAdmin = await MessAdmin.findOne({ username });
    const messId = messAdmin.messAccess;
    const messData = await Mess.findById(messId);
    res.status(200).json(messData);
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

//Update the mess schedule
router.put("/updateSchedule", authorizeMessAdmin, async (req, res) => {
  try {
    const { schedule } = req.body;
    const parsedSchedule = scheduleSchema.safeParse(schedule);
    if (parsedSchedule.error) {
      res.status(400).json({ msg: "Invalid Schedule Format" });
      return;
    }

    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    const username = decoded.username;
    const messAdmin = await MessAdmin.findOne({ username });
    if (!messAdmin) {
      res.status(404).json({ msg: "Mess Admin not found" });
      return;
    }

    const messId = messAdmin.messAccess;
    const messData = await Mess.findById(messId);
    messData.messSchedule = schedule;
    messData.save();
    res.status(200).json({ msg: "Schedule Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
