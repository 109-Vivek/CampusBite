const jwt = require("jsonwebtoken");
const STUDENT_JWT_SECRET = process.env.STUDENT_JWT_SECRET;

//admin authentication logic comes here
function authorizeStudent(req,res,next)
{
    const {authorization} = req.headers;
    const token = authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(token,STUDENT_JWT_SECRET);
        next();
    }catch(error)
    {
        res.status(403).json({msg : "Authorization Failed"});
    }
}

module.exports = {
    authorizeStudent
}
    
