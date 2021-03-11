import React,{useState,useEffect} from "react";

import Widget from "./Widget/Widget";
import AddSVG from "./SVG/AddSVG";

import "./Styles/index.css";
import "./Styles/dark.css";
import "./Styles/responsive.css";

function WidgetWindow({widgets, theme, onDelete, onChangePanel})
{

    const [addBtn,setAddBtn] = useState(false);
    useEffect(()=>{
        if(widgets.length === 9)
            setAddBtn(false)
        else
            setAddBtn(true)
    }, [widgets])

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
            {addBtn?
                <div className={"Widget Add"+theme} onClick={()=>onChangePanel(true)}>
                   <AddSVG theme={theme}/>
                </div>
                :""}
        </div>
    )
}

export default  WidgetWindow;