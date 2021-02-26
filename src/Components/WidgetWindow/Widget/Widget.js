import React, {useEffect, useState} from "react";
import Humidity from "../../../images/weather/004-humidity.svg";
import Speed from "../../../images/weather/003-windsock.svg";
import Temperature from  "../../../images/weather/celsius.svg";

import "../index.css";
import "../dark.css";

/*todo
* fix bugs for connections interrupts
* */
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

        fetch("http://localhost:9999/forecast",
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
            <svg onClick={() => makeRequest()} className={"refresh_widget" + theme} version="1.1" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 51.4 51.4" >
                <path d="M1.7,25.2c0.553,0,1-0.447,1-1c0-6.065,4.935-11,11-11h24v8.964L51.4,12.2L37.7,2.236V11.2h-24c-7.168,0-13,5.832-13,13
                    C0.7,24.753,1.147,25.2,1.7,25.2z M39.7,6.164L48,12.2l-8.3,6.036V6.164z"/>
                <path d="M49.7,26.2c-0.553,0-1,0.447-1,1c0,6.065-4.935,11-11,11h-24v-8.964L0,39.2l13.7,9.964V40.2h24c7.168,0,13-5.832,13-13
                    C50.7,26.647,50.253,26.2,49.7,26.2z M11.7,45.236L3.4,39.2l8.3-6.036V45.236z"/>
            </svg>

            {!loading?
                <svg onClick={() => onDelete(forecast)} className={"delete_widget" + theme} version="1.1" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 52 52">
                    <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
                        S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
                    <path d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0
                        s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36
                        s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293
                        c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z"/>
                </svg>
            :""}
            {loading?
                <div className={"preloader"}>
                    <svg xmlns="http://www.w3.org/2000/svg"  width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <rect x="17.5" y="30" width="15" height="40" fill="#e4d8eb">
                            <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="18;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
                            <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="64;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
                        </rect>
                        <rect x="42.5" y="30" width="15" height="40" fill="#caacd4">
                            <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
                            <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
                        </rect>
                        <rect x="67.5" y="30" width="15" height="40" fill="#b06cc5">
                            <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
                            <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
                        </rect>
                        </svg>
                    <span>{apiLimit?"Server has reached api limit":"Loading..."}</span>
                    <span>Please, wait some seconds...</span>
                </div>
                :""}

    </div>
    )
}

export default Widget;