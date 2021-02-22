import React, {useState} from "react";
import "./index.css";
import Error from "../../images/interface/warning.svg";
import Close from "../../images/interface/error.svg";

const Panel = ({onChangePanel, onAdd}) =>{

    const [errorState,setErrorState] = useState(false);
    const [suggest, setSuggest] = useState([])
    const suggestRequest = ( city ) =>{
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
        onAdd(selectedSuggest);
        onChangePanel(false);
    }

    return(
        <div className="panel">
            <div onClick={()=>onChangePanel(false)} className="close_panel">

            </div>
            <div className="panel_content">
                    <input onChange={(input)=>suggestRequest(input.target.value)}
                           className="panel_input"
                           type="text"/>

                    <div className="panel_error">
                        {errorState?<img src={Error} alt="error"/>:""}
                    </div>


                    <div className={"suggest_container"}>
                        {suggest.length!==0?(
                            <div className="suggest_response">
                                {
                                    suggest.map((item,key) =>{
                                        return  <span
                                                key={key}
                                                onClick={()=>selectSuggest(item)}
                                                className="suggest_item">
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