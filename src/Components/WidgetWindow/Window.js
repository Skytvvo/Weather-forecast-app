import React,{useState,useEffect} from "react";
import Widget from "./Widget/Widget";
import "./index.css";
import "./dark.css";
import "./responsive.css";

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

                    <svg className={"add_btn" + theme} viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg">
                        <path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256
                        256 256 256-114.835938 256-256-114.835938-256-256-256zm112 277.332031h-90.667969v90.667969c0
                         11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344
                          0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344
                           9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344
                            0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0"/>
                    </svg>

                </div>
                :""}
        </div>
    )
}

export default  WidgetWindow;