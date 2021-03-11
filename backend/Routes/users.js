const fs = require("fs");
const cors = require("cors");
const {Router} = require("express");
const router = Router();

router.put("/users/update",cors(),(req,res)=>{
    new Promise((resolve, reject)=>{
        fs.readFile("./user.json",(error, data)=>{
            if(error)
                reject(error);
            resolve(data);
        })
    })
        .then(data=>JSON.parse(data))
        .then(data=>{
            let user = data.findIndex(item => item.login === req.body.login);

            if(user === -1)
            {
                throw new Error("Unknown user")
            }
            else
            {
                if(data[user].password !== req.body.password)
                {
                    res.status(403);
                    res.send();
                    throw new Error("Incorrect password");
                }

                data[user].cities = req.body.cities;
                data[user].theme = req.body.theme;
                res.status(200);
                res.send()
                return data;
            }


        })
        .then(data=>{
            fs.writeFile("./user.json", JSON.stringify(data, null, '\t'),(err)=>{
                if(err)
                    throw err;
            })
        })
        .catch(err=>console.log(err))
})

module.exports = router;