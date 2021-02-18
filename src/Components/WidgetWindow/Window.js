import React,{useState} from "react";
import Widget from "./Widget/Widget";
import "./index.css";


function WidgetWindow({widgets,
                      theme})
{



    return(
        <div id={"WidgetWindow" + theme} >
            {widgets.map((item, key)=>{
                return <Widget key={key} theme={theme} data={item}/>
            })}
        </div>
    )
}

export default  WidgetWindow;