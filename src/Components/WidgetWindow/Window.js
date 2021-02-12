import React,{useState} from "react";
import "./index.css";


function WidgetWindow()
{
    const [widgetCount,setWidgetCount] = useState(9);



    return(
        <div id={"WidgetWindow"} >
            <div className={"Widget"}>

            </div>
             <div className={"Widget"}>

             </div>




        </div>
    )
}

export default  WidgetWindow;