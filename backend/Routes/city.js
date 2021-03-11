const fs = require("fs");
const {Router} = require("express");
const router = Router();

router.post("/city",   (req,res)=>{
    new Promise((resolve,reject) => {
        fs.readFile("./city.list.json","utf8", (error,data)=>{
            if(error)
                reject(error)
            resolve(data);
        })
    }).then(data=>JSON.parse(data))
        .then(data => {
            return data.filter(item => item.name.startsWith(req.body.city));
        })
        .then(data=>{
            res.status(200);
            res.append('Access-Control-Allow-Origin', ['*']);
            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.append('Access-Control-Allow-Headers', 'Content-Type');
            return data.slice(0,10);
        })
        .then(data => res.json(data))
        .catch(err=>console.log(err))
})

module.exports = router;