const jwt = require("jsonwebtoken");
const { messAdminJWTSecret} = require("../config.js")

//admin authentication logic comes here
function authorizeMessAdmin(req,res,next)
{
    const {authorization} = req.headers;
    const token = authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(token,messAdminJWTSecret);
        next();
    }catch(error)
    {
        res.status(403).json({msg : "Authorization Failed"});
    }
}
    
module.exports = {
    authorizeMessAdmin
}   