const { Student, Mess } = require("../db/index");
const { authorizeStudent } = require("../middlewares/student");
const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const STUDENT_JWT_SECRET = process.env.STUDENT_JWT_SECRET;

//Signup
router.post("/signup", async (req, res) => {
  const { rollNumber, password, name, isVegetarian } = req.body;
  try {
    const existingUser = await Student.findOne({ rollNumber });
    if (existingUser) return res.json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await Student.create({
      rollNumber,
      password: hashedPassword,
      name,
      isVegetarian,
    });
    res.json({ msg: "User created Successfully" });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

//Signin
router.post("/signin", async (req, res) => {
  const { rollNumber, password } = req.body;
  const user = await Student.findOne({ rollNumber });

  if (!user) {
    res.json("Invalid Roll Number");
    return ;
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.json("Incorrect Password");
      return ;
    } 
    const token = jwt.sign({ rollNumber }, STUDENT_JWT_SECRET);
    res.json({ token });
  }
});


//Get a list of messes in the campus
router.get("/messes", authorizeStudent, async (req, res) => {
  try {
    const messes = await Mess.find();
    res.status(200).json({ messes });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.put("/setPrimaryMess", authorizeStudent, async (req, res) => {
  const { authorization } = req.headers;
  const { primaryMessId } = req.body;
  const token = authorization.split(" ")[1];
  const decoded = jwt.decode(token);
  const rollNumber = decoded.rollNumber;

  try {
    // Find the student by rollNumber
    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the primaryMess field
    student.primaryMess = primaryMessId;

    // Save the updated student document
    await student.save();
    res.status(200).json({ message: "Primary mess updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error setting primary mess" });
  }
});

//return the primary mess data
router.get("/primarymess", authorizeStudent, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    const { rollNumber } = decoded;

    const user = await Student.findOne({ rollNumber });

    if (!user.primaryMess) {
      res.status(200).json({ messId : "Primary Mess not set" }); 
      return ;
    }
    res.status(200).json({messId : user.primaryMess});
  } catch (error) {
    console.log("Internal Server Error");
  }
});

module.exports = router;
