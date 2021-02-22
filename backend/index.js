const express = require("express");
const app = express();
const fs = require("fs");
const request = require('request');
const cors = require('cors');


app.use(express.json());

function OptionsTemplateAPI(Name, Country, lat, lon)
{
    this.method = "GET";
    this.url = 'https://community-open-weather-map.p.rapidapi.com/forecast/daily';
    this.qs = {
        q: `${Name},${Country}`,
        lat,
        lon,
        cnt: '7',
        units: 'metric'
    };
    this.headers = {
        'x-rapidapi-key': 'a141f63156msh59a2ecb65d6cadcp16cbe7jsnad12f6ea7364',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        useQueryString: true
    }
}

const options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/forecast/daily',
    qs: {
        q: 'san francisco,us',
        lat: '35',
        lon: '139',
        cnt: '7',
        units: 'metric or imperial'
    },
    headers: {
        'x-rapidapi-key': 'a141f63156msh59a2ecb65d6cadcp16cbe7jsnad12f6ea7364',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        useQueryString: true
    }
};



const PORT = 9999;

//Handled options request, allowed all origins
app.options("*",cors());
app.get("/", (req,res)=>{
    request(new OptionsTemplateAPI("san francisco","us",35,139),
        function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body)
    });
})
//Allowed all origins
app.post("/forecast",cors(),(req,res)=>{
        request(new OptionsTemplateAPI(req.body.name, req.body.country, req.body.lat,req.body.lon),
            (error, response, body)=>{
            res.send(body)
        })

})


app.post("/login",(req,res)=>{

})


app.post("/reg", (req,res)=> {
    let pr = new Promise((resolve,reject)=>{
        fs.readFile("users.json", (error, data) => {
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
                fs.writeFile("users.json",JSON.stringify(updatedData), (err)=>{
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


app.post("/city",  async (req,res)=>{
    let reader = new Promise((resolve,reject) => {
          fs.readFile("city.list.json","utf8", (error,data)=>{
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

app.listen(PORT, ()=>console.log(`The server is running on the PORT ${PORT}`));


