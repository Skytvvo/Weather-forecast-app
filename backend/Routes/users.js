const auth = require("../components/auth.middleware");
const cors = require("cors");
const {Router} = require("express");
const router = Router();
const User = require("../components/User");

router.use(cors())

router.put(
    "/users",
    auth,
    async (req,res)=>{
            const userData = await User.findOne({_id:req.user.userId});
            if(!userData)
            {
                return res.status(404)
                    .json({
                        message:"No name user"
                    })
            }
            res.json({
                login:userData.login,
                theme:userData.theme,
                cities:userData.cities
            });
})

module.exports = router;