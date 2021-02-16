import React from "react";
import Sunny from "../../../images/weather/011-sunny.svg";
import Foggy  from "../../../images/weather/016-foggy.svg";

import "../index.css";

const Widget = ({theme}) => {

  // let forecast = JSON.parse("{\"coord\":{\"lon\":-0.13,\"lat\":51.51},\"weather\":[{\"id\":741,\"main\":\"Fog\",\"description\":\"fog\",\"icon\":\"50n\"}],\"base\":\"stations\",\"main\":{\"temp\":284.04,\"pressure\":1011,\"humidity\":93,\"tempmin\":280.93,\"tempmax\":287.04},\"visibility\":10000,\"wind\":{\"speed\":1.5},\"clouds\":{\"all\":20},\"dt\":1570234102,\"sys\":{\"type\":1,\"id\":1417,\"message\":0.0102,\"country\":\"GB\",\"sunrise\":1570255614,\"sunset\":1570296659},\"timezone\":3600,\"id\":2643743,\"name\":\"London\",\"cod\":200}")
   // console.log(forecast)
    return(
        <div className={"Widget" + theme}>


        </div>
    )
}

export default Widget;