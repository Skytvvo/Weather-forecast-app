import React,{useEffect} from "react";
import Widget from "./Widget/Widget";
import "./index.css";

function WidgetWindow({widgets, theme, onDelete})
{
    return(
        <div id={"WidgetWindow" + theme} >
            {widgets.map((item, key)=> {
                console.log(item);
                  return <Widget onDelete={onDelete} key={`widget_${key}`} theme={theme} data={item}/>
                }
            )}
        </div>
    )
}

export default  WidgetWindow;