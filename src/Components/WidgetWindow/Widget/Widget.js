import React, {useEffect, useState} from "react";
import Humidity from "../../../images/weather/004-humidity.svg";
import Speed from "../../../images/weather/003-windsock.svg";
import Temperature from  "../../../images/weather/celsius.svg";

import PreloaderSVG from "./SVG/PreloaderSVG.jsx";
import DeleteSVG from "./SVG/DeleteSVG";
import UpdateSVG from "./SVG/UpdateSVG";

import "../Styles/index.css";
import "../Styles/dark.css";
import "../Styles/responsive.css";


const Widget = ({theme, data, onDelete}) => {

    const [forecast, setForecast] = useState(null)
    const [apiLimit, setApiLimit]=useState(false);
    const [loading, setLoading] = useState(true);
    const [reqInterval,setReqInterval]=useState(null);
    useEffect(()=>{
        makeRequest();
        setLoading(true);
    },[data])

    useEffect(()=>{
        if(apiLimit)
        {
            let reqIn = setInterval(()=>makeRequest(),30000);
            setLoading(true)
            setReqInterval(reqIn);
        }
        if(!apiLimit && reqInterval !== null)
        {
            clearInterval(reqInterval);
            setReqInterval(null);
        }
    },[apiLimit])

    const makeRequest = ()=>{

        fetch("http://localhost:9999/api/forecast",
            {
                method:"POST",
                headers:{
                    "Content-Type":'application/json;charset=utf-8'
                },
                body:JSON.stringify(data)
            })
            .then(response=>{
                if(response.status === 429)
                    throw new Error(response.statusText)
                return response
            })
            .then(response => response.json())
            .then(response=> {
                response._id = data._id;
                setForecast(response);
                setApiLimit(false);
                setLoading(false);
            })
            .catch(err=>{
                console.log(err);
                setApiLimit(true);
            })
    }

    const GetWeekDay = (time) =>{
        switch (new Date(time * 1000).getDay())
        {
            case 1:
            {
                return "Mo";
            }
            case 2:
            {
                return "Tu";
            }
            case 3:
            {
                return "We";
            }
            case 4:
            {
                return "Th";
            }
            case 5:
            {
                return "Fr";
            }
            case 6:
            {
                return  "Sa";
            }
            case 0:
            {
                return "Su";
            }
            default:
            {
                return "GG"
            }
        }
    }

    const GetDescription = (str) =>
    {
        if(str === "" || str === null)
            return "";
        return str[0].toUpperCase() + str.slice(1);
    }


    return(
        <div className={"Widget" + theme}>
            {!loading?<div className={"Today"}>
            <div className="day">
                <div className={"day_png"}>
                    {
                        (forecast) ?
                            <img
                                src={`http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}.png`
                                } alt={`${forecast ? forecast.list[0].weather[0].description : ""}`}/> : ""}
                    <p>{forecast ? (GetDescription(forecast.list[0].weather[0].description)) : ""}</p>
                    <p>
                        {forecast ? (GetWeekDay(forecast.list[0].dt)) : ("")}
                        {forecast ? (`, ${forecast.city.name}(${forecast.city.country}) `) : ("")}
                    </p>
                </div>
                <div className="forecast_day">
                    <div className="day_props">
                        <img src={Temperature} alt="Temperature"/>
                        <span>{forecast ? (`${forecast.list[0].temp.min}${'\u00b0'}/${forecast.list[0].temp.max}${'\u00b0'}`) :
                            ("")}</span>
                    </div>
                    <div className="day_props">
                        <img src={Humidity} alt="Humidity"/>
                        <span>{forecast ? (`${forecast.list[0].humidity}%`) : ("")}</span>
                    </div>
                    <div className="day_props">
                        <img src={Speed} alt="Wind_speed"/>
                        <span>{forecast ? (`${forecast.list[0].speed} km/h`) : ("")}</span>
                    </div>
                </div>
            </div>

        </div>:""}
            {!loading? <div className={"Week"}>
                {forecast ? (forecast.list.map((item, key) => {
                    if (key === 0)
                        return;
                    return <div key={key} className={"Week_props"}>
                        <div className="props_img">
                            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt=""/>
                        </div>
                        <div className="props_temperature">
                            <span>{item.temp.day}{'\u00b0'}</span>
                        </div>
                        <div className="props_weekday">
                            <span>{GetWeekDay(item.dt)}</span>
                        </div>
                    </div>
                })) : ("")}
            </div>:""}
            <UpdateSVG theme={theme} makeRequest={makeRequest}/>

            {!loading?
                <DeleteSVG forecast={forecast} theme={theme} onDelete={onDelete}/>
            :""}
            {loading?
                <div className={"preloader"}>
                    <PreloaderSVG/>
                    <span>{apiLimit?"Server has reached api limit":"Loading..."}</span>
                    <span>Please, wait some seconds...</span>
                </div>
                :""}

    </div>
    )
}

export default Widget;