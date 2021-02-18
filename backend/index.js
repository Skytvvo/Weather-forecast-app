const express = require("express");
const app = express();
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
        units: 'metric or imperial'
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
    request(new OptionsTemplateAPI("san francisco","us",35,139), function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body)
    });
})
//Allowed all origins
app.post("/forecast",cors(),(req,res)=>{
        request(new OptionsTemplateAPI(req.body.Name, req.body.Country, req.body.lat,req.body.lon),(error, response, body)=>{
            res.send(body)
        })

})
app.listen(PORT, ()=>console.log(`The server is running on the PORT ${PORT}`));

