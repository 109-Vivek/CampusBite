const jwt = require("jsonwebtoken");
const {adminJWTSecret} = require("../config.js")

//admin authentication logic comes here
function authorizeAdmin(req,res,next)
{
    const {authorization} = req.headers;
    const token = authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(token,adminJWTSecret); 
        next();
    }catch(error)
    {
        res.status(403).json({msg : "Authorization Failed"});
    }
}
module.exports = {
    authorizeAdmin
}
