import React, {useEffect, useState} from "react";
import Humidity from "../../../images/weather/004-humidity.svg";
import Speed from "../../../images/weather/003-windsock.svg";
import Temperature from  "../../../images/weather/celsius.svg";
import Delete from "../../../images/interface/error.svg";
import "../index.css";

/*todo
* fix bugs for connections interrupts
* */
const Widget = ({theme, data, onDelete}) => {

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
            })

    },[])
    useEffect(()=>{
        console.log(data)
    })

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
        let date = new Date(time*1000);
        let day  = `${date.getDate()}th `;
        switch (date.getMonth())
        {
            case 0: day+="January"; break;
            case 1: day+="February"; break;
            case 2: day+="March"; break;
            case 3: day+="April"; break;
            case 4: day+="May"; break;
            case 5: day+="June"; break;
            case 6: day+="July"; break;
            case 7: day+="August"; break;
            case 8: day+="September"; break;
            case 9: day+="October"; break;
            case 10: day+="November"; break;
            case 11: day+="December"; break;
        }
        return day;
    }

    const GetDescription = (str) =>
    {
        if(str === "" || str === null)
            return "";
        return str[0].toUpperCase() + str.slice(1);
    }


    return(
        <div className={"Widget" + theme}>
            <div className={"Today"}>
                <div className="day">
                    <div className={"day_png"}>
                        <img src={
                            forecast?(` http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}.png`):("")
                        } alt={`${forecast?forecast.list[0].weather[0].description:""}`}/>
                        <p>{forecast?(GetDescription(forecast.list[0].weather[0].description)):""}</p>
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
                {forecast?(forecast.list.map((item,key)=>{
                    if(key===0)
                        return ;
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
                })):("")}
            </div>
            <img src={Delete} onClick={()=>onDelete(forecast)} className={"delete_widget"} alt="delete_widget"/>
        </div>
    )
}

export default Widget;