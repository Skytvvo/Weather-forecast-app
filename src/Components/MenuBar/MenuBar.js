import React, {useState, useEffect} from "react";

import SunSVG from "./SVG/SunSVG";
import LogoutSVG from "./SVG/LogoutSVG";

import "./Styles/index.css";
import "./Styles/dark.css";
import "./Styles/responsive.css";

const MenuBar=({theme, username, onChangeTheme}) =>
{
    const [getTime,setTime] = useState("");

    const currentTime = () => {
        let response = "";

        let time = new Date();

        switch (time.getDay())
        {
            case 1:
            {
                response += "Monday ";
                break;
            }
            case 2:
            {
                response += "Tuesday ";
                break;
            }
            case 3:
            {
                response += "Wednesday ";
                break;
            }
            case 4:
            {
                response += "Thursday ";
                break;
            }
            case 5:
            {
                response += "Friday ";
                break;
            }
            case 6:
            {
                response += "Saturday "
                break;
            }
            case 0:
            {
                response += "Sunday "
                break;
            }
        }
        response += time.getDate() + "th, ";
        response += time.getHours();

        if(time.getSeconds() % 2 === 0)
            response += ':';
        else
            response+= ' ';

        if(time.getMinutes() < 10)
            response += '0';

        response += time.getMinutes();

        return response;
    }



    useEffect(()=>{setInterval(() => setTime(currentTime()) , 1000 )},[])

    const logOut = () =>{
        localStorage.removeItem("user");
        document.location.reload();
    }

    return(
        <div className={"Bar_Top" + theme}>

            <button className={"Bar_Top_Btn" + theme}>
                {username.length > 6?username.slice(0,7) + "..." : username}
            </button>


            <span className="Bar_Top_Date">
                {getTime}
            </span>

            <div className={"Bar_Top_Btn_Interface" + theme}>

                <button onClick={()=>onChangeTheme()}>
                    <SunSVG/>
                </button>
                <button onClick={()=>logOut()}>
                    <LogoutSVG/>
                </button>
            </div>

        </div>
    )
}

export default MenuBar;