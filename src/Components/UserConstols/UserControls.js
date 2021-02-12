import React from "react";
import "./index.css";

function UserControls()
{

    return(
        <div className="UserControlsBar">
            <button id="NewWidget">New widget</button>
            <button id="RefreshWidget">Refresh</button>
            <button id="SetHome">Set home place</button>
        </div>
    );
}

export default UserControls;
