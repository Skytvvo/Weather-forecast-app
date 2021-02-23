import React,{useEffect} from "react";
import Widget from "./Widget/Widget";
import "./index.css";


function WidgetWindow({widgets,
                      theme,
                          onDelete})
{


    return(
        <div id={"WidgetWindow" + theme} >
            {widgets.map((item, key)=>{
                return <Widget onDelete={onDelete} key={key} theme={theme} data={item}/>
            })}
        </div>
    )
}

export default  WidgetWindow;