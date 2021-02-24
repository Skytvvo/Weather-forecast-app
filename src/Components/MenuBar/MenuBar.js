import React, {useState, useEffect} from "react";
import "./index.css";
import LeftBarImage from "../../images/interface/menu-4.svg";
import DarkThemeImage from "../../images/interface/sun.svg";
import ExitImage from "../../images/interface/exit.svg";
import Refresh from "../../images/interface/repeat.svg";
import AddWidget from "../../images/interface/add.svg";

const MenuBar=({widgets, theme, onChangePanel}) =>
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
        <div className="Bar_Top">

            <button className="Bar_Top_Btn">
                <img alt="LeftBar" src={LeftBarImage}/>
            </button>


            <span className="Bar_Top_Date">
                {getTime}
            </span>

            <div className="Bar_Top_Btn_Interface">
                <button onClick={()=>onChangePanel(true)}>
                    <img src={AddWidget} alt="add widget"/>
                </button>
                <button>
                    <img src={Refresh} alt="refresh"/>
                </button>
                <button>
                    <img alt="Dark Theme" src={DarkThemeImage}/>
                </button>
                <button onClick={()=>logOut()}>
                    <img alt="Logout" src={ExitImage}/>
                </button>
            </div>

        </div>
    )
}

export default MenuBar;