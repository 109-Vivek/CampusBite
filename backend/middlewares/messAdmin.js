const jwt = require("jsonwebtoken");
const MESS_ADMIN_JWT_SECRET = process.env.MESS_ADMIN_JWT_SECRET;

//admin authentication logic comes here
function authorizeMessAdmin(req,res,next)
{
    const {authorization} = req.headers;
    const token = authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(token,MESS_ADMIN_JWT_SECRET);
        next();
    }catch(error)
    {
        res.status(403).json({msg : "Authorization Failed"});
    }
}
    
module.exports = {
    authorizeMessAdmin
}   