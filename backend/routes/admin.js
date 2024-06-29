const { Admin, Mess, MessAdmin } = require("../db");
const {Router} = require("express");
const router = Router();
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;
const {authorizeAdmin} = require("../middlewares/admin");



//Signin
router.post("/signin",async (req,res)=>{
    const {username,password} = req.body;
    const admin = await Admin.findOne({username});
    if(!admin)
    {
        res.json("Invalid Username");
        return;
    }
    else{
        const match = await bcrypt.compare(password,admin.password); 
        if(!match)
        {
            res.json("Incorrect Password");
            return;
        }

        const token = jwt.sign({username,password},ADMIN_JWT_SECRET);
        res.json({token});
    }
})


//create mess
router.post("/create",authorizeAdmin,async (req,res)=>{
    try
    {
        const {messName,adminName,adminUsername,adminPassword} =req.body;
        const hashedPassword = await bcrypt.hash(adminPassword,10);
        const mess = await  Mess.create({ messName,messSchedule : scheduleTemplate});
        mess.save();
        const messId = mess._id;
        const admin = await MessAdmin.create({name : adminName, username : adminUsername,password : hashedPassword, messAccess : messId});
        admin.save();
        res.status(200).json({msg : "Mess Created Successfully"});
    }
    catch(error)    
    {
        console.error("Something went wrong",error);
        res.status(500).json({msg : "Internal Server Error"});
    }
})

//get list of messes
router.get("/listMess", authorizeAdmin, async (req, res) => {
    try {
        const messes = await Mess.find();
        const messData = await Promise.all(messes.map(async (mess) => {
            const admin = await MessAdmin.findOne({ messAccess: mess._id });
            return { _id: mess._id, messName: mess.messName, adminName: admin.name, adminUsername: admin.username };
        }));
        res.status(200).json({ messes: messData });
    } catch (error) {
        console.error("Something went wrong", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


//delete a mess
router.delete("/deleteMess",authorizeAdmin,async (req,res)=>{
    try{
        const {messId} = req.body;
        const messAdmin = await MessAdmin.findOne({messAccess : messId});
        const messAdminId = messAdmin._id;
        const messDeleted = await Mess.findByIdAndDelete(messId);
        if(!messDeleted) res.status(404).json({msg : "Mess not found"});
        const messAdminDeleted = await MessAdmin.findByIdAndDelete(messAdminId); 
        if(!messAdminDeleted) res.status(404).json({msg : "Mess Admin not found"});
        res.status(200).json({msg : 'Mess Deleted Successfully'});
    }
    catch(error)
    {
        console.error("Something went wrong",error);
        res.status(500).json({msg : "Internal Server Error"});
    }
})

const scheduleTemplate  = {
    Sunday : {
        breakfast : "",
        lunch : "",
        snacks : "",
        dinner : ""
    },
    Monday : {
        breakfast : "",
        lunch : "",
        snacks : "",
        dinner : "",
    },
    Tuesday : {
        breakfast : "",
        lunch : "",
        snacks : "",
        dinner : ""
    },
    Wednesday : {
        breakfast : "",
        lunch : "",
        snacks : "",
        dinner : ""
    },
    Thursday  : {
        breakfast : "",
        lunch : "",
        snacks : "",
        dinner : ""
    },
    Friday  : {
        breakfast : "",
        lunch : "",
        snacks : "",
        dinner : ""
    },
    Saturday : {
        breakfast : "",
        lunch : "",
        snacks : "",
        dinner : ""
    }
}

module.exports = router;

