import React from "react";
import Widget from "../WidgetWindow/Widget/Widget";
import "./index.css";

function UserControls({widgets,
                          onAddWidget,
                          onRefreshWidgets,
                          onSetHome})
{
    const CreateNewWidget=()=>{
        if(widgets.length===9)
        {
            alert("Widgets full")
            return;
        }
        let town = prompt("Enter town");
        onAddWidget({Town:town})
    }

    const SetHomeHandler = ()=>{

        onSetHome();
    }

    return(
        <div className="UserControlsBar">
            <button id="NewWidget" onClick={CreateNewWidget}>New widget</button>
            <button id="RefreshWidget" onClick={onRefreshWidgets()}>Refresh</button>
            <button id="SetHome" onClick={SetHomeHandler}>Set home place</button>
        </div>
    );
}

export default UserControls;
