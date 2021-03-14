import React, {useState} from "react";

import ErrorSVG from "./SVG/ErrorSVG";

import "./Styles/index.css";
import "./Styles/dark.css";
import "./Styles/responsive.css";

const Panel = ({onChangePanel, onAdd, theme, onCheckCity}) =>{

    const [errorState,setErrorState] = useState(false);
    const [suggest, setSuggest] = useState([])

     const suggestRequest = ( city ) =>{
        setErrorState(false);
        if( city === "" )
        {
            setSuggest([]);
            return;
        }

        fetch("http://localhost:9999/api/city",
            {
                method:"POST",
                headers:{
                    "Content-Type":'application/json;charset=utf-8'
                },
                body:JSON.stringify({city})
            }
        )
            .then(response => response.json())
            .then(data => setSuggest(data))
    }

    const selectSuggest=(selectedSuggest)=>{
        setSuggest([]);
        if(onCheckCity(selectedSuggest))
            onAdd(selectedSuggest);
        else
        {
            setErrorState(true);
        }
    }

    return(
        <div className="panel">
            <div onClick={()=>onChangePanel(false)} className="close_panel">

            </div>
            <div className={"panel_content"+theme}>
                    <input onChange={(input)=>suggestRequest(input.target.value)}
                           className={"panel_input" +theme}
                           type="text"/>

                    <div className="panel_error">
                        {errorState?
                            //
                            <ErrorSVG/>
                            :""}
                    </div>


                    <div className={"suggest_container"}>
                        {suggest.length!==0?(
                            <div className={"suggest_response"+theme}>
                                {
                                    suggest.map((item,key) =>{
                                        return  <span
                                                key={key}
                                                onClick={()=>selectSuggest(item)}
                                                className={"suggest_item" + theme}>
                                                    {`${item.name} (${item.country})`}
                                                </span>
                                    })
                                }
                            </div>)
                            :""}
                    </div>
            </div>

        </div>
    )
}

export default Panel;