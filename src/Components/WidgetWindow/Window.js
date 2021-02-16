import React,{useState} from "react";
import Widget from "./Widget/Widget";
import "./index.css";


function WidgetWindow({widgets,
                      theme})
{



    return(
        <div id={"WidgetWindow" + theme} >
            {widgets.map((item)=>{
                return <Widget theme={theme}/>
            })}
        </div>
    )
}

export default  WidgetWindow;