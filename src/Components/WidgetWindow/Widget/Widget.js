import React, {useEffect, useState} from "react";
import Humidity from "../../../images/weather/004-humidity.svg";
import Speed from "../../../images/weather/003-windsock.svg";
import Temperature from  "../../../images/weather/celsius.svg";
import "../index.css";

const Widget = ({theme, data}) => {

    const [forecast, setForecast] = useState(null)

    useEffect(()=>{
        fetch("http://localhost:9999/forecast",
            {
                method:"POST",
                headers:{
                    "Content-Type":'application/json;charset=utf-8'
                },
                body:JSON.stringify(data)
            })
            .then(response => response.json())
            .then(response=> {
                setForecast(response);
                return response;
            })
            .then((response => console.log(response)))


    },[])

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

    const GetMonthDay = (time) =>{
        return new Date(time*1000).getDate();
    }


    return(
        <div className={"Widget" + theme}>
            <div className={"Today"}>
                <div className="day">
                    <div className={"day_png"}>
                        <img src={
                            forecast?(` http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}.png`):("")
                        } alt={`${forecast?forecast.list[0].weather[0].description:""}`}/>
                        <p>
                            { forecast?(GetWeekDay(forecast.list[0].dt)):("")}
                            {forecast?(`, ${forecast.city.name} `):("")}
                        </p>
                    </div>
                    <div className="forecast_day">
                        <div className="day_props">
                            <img src={Temperature} alt="Temperature"/>
                            <span>{forecast?(`min:${forecast.list[0].temp.min }\nmax:${forecast.list[0].temp.max }`):
                                ("")}</span>
                        </div>
                        <div className="day_props">
                            <img src={Humidity} alt="Humidity"/>
                            <span>{forecast?(`${forecast.list[0].humidity}%`):("")}</span>
                        </div>
                        <div className="day_props">
                            <img src={Speed} alt="Wind_speed"/>
                            <span>{forecast?(`${forecast.list[0].speed} km/h`):("")}</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className={"Week"}>

            </div>
        </div>
    )
}

export default Widget;