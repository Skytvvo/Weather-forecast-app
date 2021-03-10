import React, {useState} from "react";
import "./index.css";
import "./dark.css";
import "./responsive.css";
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

        fetch("http://localhost:9999/city",
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
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 52 52">

                                <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
                                    S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
                                <path d="M26,10c-0.552,0-1,0.447-1,1v22c0,0.553,0.448,1,1,1s1-0.447,1-1V11C27,10.447,26.552,10,26,10z"/>
                                <path d="M26,37c-0.552,0-1,0.447-1,1v2c0,0.553,0.448,1,1,1s1-0.447,1-1v-2C27,37.447,26.552,37,26,37z"/>
                            </svg>

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