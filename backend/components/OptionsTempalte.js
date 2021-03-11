const express = require('express');
const app = express();

exports.OptionsTemplateAPI = function OptionsTemplateAPI(Name, Country, lat, lon)
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