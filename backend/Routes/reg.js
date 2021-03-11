const fs = require("fs");
const {Router} = require("express");
const router = Router();

router.post("/reg", (req,res)=> {
    new Promise((resolve,reject)=>{
        fs.readFile("./user.json", (error, data) => {
            if (error)
                reject(error)
            resolve(data)
        })
    })
        .then(data=>JSON.parse(data))
        .then(data => {
            let newUser = {
                login:req.body.login,
                password:req.body.password,
                cities:[],
                theme: ""
            }
            let matches = data.filter(item => item.login === newUser.login);
            res.append('Access-Control-Allow-Origin', ['*']);
            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.append('Access-Control-Allow-Headers', 'Content-Type');
            if(data.length === 0 || matches.length === 0)
            {
                let updatedData = [...data,newUser];
                res.status(200);
                res.json(newUser);
                fs.writeFile("./user.json",JSON.stringify(updatedData, null, '\t'), (err)=>{
                    console.log(err)
                });
            }
            else{
                res.status(204);
                res.send();
            }

        })
        .catch(err=>console.log(err))
})


module.exports = router;
