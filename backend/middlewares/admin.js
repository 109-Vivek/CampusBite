const jwt = require("jsonwebtoken");
const { Admin } = require("../db");

const dotenv = require('dotenv');
dotenv.config();

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;

//admin authentication logic comes here
function authorizeAdmin(req,res,next)
{
    const {authorization} = req.headers;
    const token = authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(token,ADMIN_JWT_SECRET); 
        next();
    }catch(error)
    {
        res.status(403).json({msg : "Authorization Failed"});
    }
}
module.exports = {
    authorizeAdmin
}
