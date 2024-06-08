const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const studentRoute = require("./routes/student");
const messAdminRoute = require("./routes/messAdmin");
const adminRoute = require("./routes/admin");

app.use("/student",studentRoute);
app.use("/messadmin",messAdminRoute);
app.use("/admin",adminRoute);

const {PORT} = require("./config");


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
