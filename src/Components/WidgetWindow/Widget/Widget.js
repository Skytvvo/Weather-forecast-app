import React, {useEffect, useState} from "react";
import Sunny from "../../../images/weather/011-sunny.svg";
import Foggy  from "../../../images/weather/016-foggy.svg";

import "../index.css";

const Widget = ({theme, data}) => {

    const [forecast, setForecast] = useState()

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

            </div>
            <div className={"Week"}>

            </div>
        </div>
    )
}

export default Widget;