import React, {useState} from "react";
import "./index.css";
import Error from "../../images/interface/warning.svg";
import Close from "../../images/interface/error.svg";
const Panel = ({onChangePanel}) =>{

    const [errorState,setErrorState] = useState(false);

    return(
        <div className="panel">
            <div onClick={()=>onChangePanel(false)} className="close_panel">

            </div>
            <div className="panel_content">
                    <input className="panel_input" type="text"/>
                    <div className="panel_error">
                        {!errorState?<img src={Error} alt="error"/>:""}
                    </div>
                    <button className="panel_btn">Confirm</button>
            </div>

        </div>
    )
}

export default Panel;