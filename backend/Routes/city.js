const fs = require("fs");
const cors = require("cors");
const {Router} = require("express");
const router = Router();
const City = require("../components/City");

router.use(cors())

router.post(
    "/city",
    async (req,res)=>{
        const searching = await City.find({ "name" : { $regex: new RegExp("^"+req.body.city), $options: 'i' }})
            .limit(10);
        res.json(searching);
})

router.post(
    "/city/id",
    async (req,res)=>{
            const searching = await City.findOne({ _id:req.body.id})
            res.json(searching);
    })

module.exports = router;