import React from "react";
import Widget from "../WidgetWindow/Widget/Widget";
import "./index.css";

function UserControls({widgets,
                          onRefreshWidgets,
                          onSetHome,
                          onChangePanel
                      })
{
    const CreateNewWidget=()=>{
        if(widgets.length===9)
        {
            alert("Widgets full")
        }
        onChangePanel(true);
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
