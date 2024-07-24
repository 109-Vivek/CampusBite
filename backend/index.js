const express = require("express");
const cors = require("cors");
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors());

const studentRoute = require("./routes/student");
const messAdminRoute = require("./routes/messAdmin");
const adminRoute = require("./routes/admin");

app.use("/student",studentRoute);
app.use("/messadmin",messAdminRoute);
app.use("/admin",adminRoute);

app.get("/", (req, res) => {
  res.send("Your backend is up and running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
