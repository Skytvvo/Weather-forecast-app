import React,{useEffect} from "react";
import Widget from "./Widget/Widget";
import "./index.css";
import "./dark.css"
function WidgetWindow({widgets, theme, onDelete})
{
    return(
        <div className={"WidgetWindow" + theme} >
            {widgets.map((item, key)=> {
                  return <Widget
                      onDelete={onDelete}
                      key={`widget_${key}`}
                      theme={theme}
                      data={item}
                  />
                }
            )}
        </div>
    )
}

export default  WidgetWindow;