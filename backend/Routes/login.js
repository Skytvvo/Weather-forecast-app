const fs = require("fs");
const {Router} = require("express");
const router = Router();

router.post("/login",(req,res)=>{
    new Promise((resolve,reject) => {
        fs.readFile( "./user.json",(error,data)=>
        {
            if(error)
                reject(error);
            resolve(data);
        })
    })
        .then(data=>JSON.parse(data))
        .then(data=>{
            let match = data.find((element, index, array)=>{
                return element.login === req.body.login;
            })

            res.append('Access-Control-Allow-Origin', ['*']);
            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.append('Access-Control-Allow-Headers', 'Content-Type');

            if(match===undefined)
            {
                res.status(404);
                res.send();

                return data;
            }

            if(match.password !== req.body.password)
            {
                res.status(403);
                res.send();
                return data;
            }

            res.status(200);
            res.json(match);
        })
        .catch(err => console.log(err,__dirname))
})


module.exports = router;