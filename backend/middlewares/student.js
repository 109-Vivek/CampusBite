const jwt = require("jsonwebtoken");
const { studentJWTSecret} = require("../config.js")

//admin authentication logic comes here
function authorizeStudent(req,res,next)
{
    const {authorization} = req.headers;
    const token = authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(token,studentJWTSecret);
        next();
    }catch(error)
    {
        res.status(403).json({msg : "Authorization Failed"});
    }
}

module.exports = {
    authorizeStudent
}
    
