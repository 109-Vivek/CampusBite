const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/CampusBite');


//Student Schema
const studentSchema = new mongoose.Schema(
    {
        rollNumber :{
            type : Number,
            required: true,
            unique : true,
        },
        password : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required: true
        },
        isVegetarian : {
            type : Boolean,
        },
        primaryMess : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Mess'
        }
    }
)

//Schedule object structure
const schedule  = {
    Sunday : {
        breakfast : [],
        lunch : [],
        snacs : [],
        dinner : [],
    },
    Monday : {
        breakfast : [],
        lunch : [],
        snacs : [],
        dinner : [],
    },
    Tuesday : {
        breakfast : [],
        lunch : [],
        snacs : [],
        dinner : []
    },
    Wednesday : {
        breakfast : [],
        lunch : [],
        snacs : [],
        dinner : []
    },
    Thursday  : {
        breakfast : [],
        lunch : [],
        snacs : [],
        dinner : []
    },
    Friday  : {
        breakfast : [],
        lunch : [],
        snacs : [],
        dinner : []
    },
    Saturday : {
        breakfast : [],
        lunch : [],
        snacs : [],
        dinner : []
    }
}

//Mess Schema
const messSchema = new mongoose.Schema({
    messName : {
        type : String,
        required : true,
        unique : true
    },
    messSchedule : {
        type : Object, //add mess schedule here
        default : schedule
    },
})



//Mess Admin Schema
const messAdminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type  : String,
        required : true,
        unique : true
    },
    password  : {
        type : String,
        required : true
    },
    messAccess :
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Mess',
        required : true
    }
})

//Admin that can manage messes in the campus
const adminSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
})

const Student = mongoose.model('Student',studentSchema);
const MessAdmin =mongoose.model('MessAdmin',messAdminSchema);
const Admin = mongoose.model('Admin',adminSchema);
const Mess = mongoose.model('Mess',messSchema);

module.exports = {
    Student,MessAdmin,Admin,Mess
}