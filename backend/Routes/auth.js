const {Router} = require("express");
const router = Router();

const bcrypt = require("bcrypt");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../components/User");
const cors = require("cors");
const config = require("../../Config/default.json")

router.post(
    "/reg",
    check("login", "Incorrect login").isLength({min:3}),
    check("password", "Password must to has minimum 6 symbols").exists(),
    cors(),
    async (req,res)=> {
        try
        {
            const errors = validationResult(req);

            if(!errors.isEmpty())
            {
                return res.status(400)
                    .json({
                        errors:errors.array(),
                        message:"Incorrect auth data"
                    })
            }

            const {login, password} = req.body;
            const newUser = await User.findOne({login});

            if(newUser)
            {
                return res.status(400).json({message:"This user already exist"})
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({login, password:hashedPassword});
            await user.save();

            res.status(200)
                .json({message:"User was registered"})
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({message :"Something went wrong..."})
    }
})

router.post(
    "/log",
    check("login", "Incorrect login").isLength({min:3}),
        check("password", "Password must to has minimum 6 symbols").exists(),
    cors(),
    async (req,res)=>{
        try
        {
            const errors = validationResult(req);

            if(!errors.isEmpty())
            {
                return res.status(400)
                    .json({
                        errors:errors.array(),
                        message:"Incorrect auth data"
                    })
            }

            const {login, password} = req.body;
            const userExist = await User.findOne({login});

            if(!userExist)
            {
                res.status(404)
                    .json({
                        message: "User doesn't exist"
                    })
            }

            const userAccess = await bcrypt.compare(password, userExist.password)

            if(!userAccess)
            {
                res.status(403)
                    .json({
                        message: "Incorrect password try again"
                    })
            }

            const token = jwt.sign(
                {userId:userExist.id},
                config.jwtKeyWord,
                {expiresIn: "1h"}
            )

            res.json({token, userId:userExist.id})
        }
        catch (err)
        {
            console.log(err);
            res.status(500).json({message :"Something went wrong..."})
        }

})


module.exports = router;
