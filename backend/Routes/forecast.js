const {Router} = require("express");
const template = require("../components/OptionsTempalte");
const cors = require('cors');
const router = Router();
const request = require('request');

router.post("/forecast", cors(),(req,res)=>{
    request(new template.OptionsTemplateAPI(req.body.name, req.body.country, req.body.lat,req.body.lon),
        (error, response, body)=>{
            if(response && response.statusCode===429)
            {
                res.status(429)
                res.json("API limit")
            }
            else
                res.send(body);
        })

})

module.exports = router;