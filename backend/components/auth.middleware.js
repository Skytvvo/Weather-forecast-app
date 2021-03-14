const config = require("../../Config/default.json")
const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    if(req.method === "OPTIONS")
        next();
    try
    {
        const token = req.headers.authorization;
        if(!token) {

            return res.status(401).json({message: "User doesn't auth"});

        }

        const decoded = jwt.verify(token, config.jwtKeyWord);
        req.user = decoded;
        next();
    }
    catch (err)
    {
        console.log(err)
    }
}