import React, {useState} from "react";
import "./index.css";
import Error from "../../images/interface/warning.svg";
import Close from "../../images/interface/error.svg";
const Panel = ({onChangePanel}) =>{

    const [errorState,setErrorState] = useState(false);
    const [suggest, setSuggest] = useState("")
    const suggestRequest = ( city ) =>{
        if( city === "" )
            return;
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
            .then(data => console.log(data))
    }

    return(
        <div className="panel">
            <div onClick={()=>onChangePanel(false)} className="close_panel">

            </div>
            <div className="panel_content">
                    <input onChange={(input)=>suggestRequest(input.target.value)} className="panel_input" type="text"/>
                    <div className="panel_error">
                        {errorState?<img src={Error} alt="error"/>:""}
                    </div>
                    <button className="panel_btn">Confirm</button>
            </div>

        </div>
    )
}

export default Panel;