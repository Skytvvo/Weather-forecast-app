const auth = require("../components/auth.middleware");
const cors = require("cors");
const {Router} = require("express");
const router = Router();
const User = require("../components/User");
const {Schema, model, Types} = require("mongoose");

router.use(cors())

router.put(
    "/users/get",
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
router.put(
    "/users/set",
    auth,
    async (req,res)=> {
        console.log(req.body.cityId,req.user.userId)
        await User.findOneAndUpdate(
            {
                _id:req.user.userId
            },
            {
                $addToSet:{
                    cities:req.body.cityId
                }
            });
        res.send()
    }
)
router.put(
    "/theme",
    auth,
    async (req,res)=>{
        await User.updateOne({_id:req.user.userId},{theme:req.body.theme})
        res.send();
    }
)

router.delete(
    "/remove",
    auth,
    async (req,res)=>{
        await User.updateOne({
            _id:req.user.userId
        }, {
            $pull:{cities:req.body._id}
        })
    }
)

module.exports = router;