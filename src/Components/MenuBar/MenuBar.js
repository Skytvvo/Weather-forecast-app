import React, {useState} from "react";
import "./index.css";
import LeftBarImage from "../../images/interface/menu-4.svg";
import DarkThemeImage from "../../images/interface/sun.svg";
import ExitImage from "../../images/interface/exit.svg";

function MenuBar()
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
            case 7:
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

    setInterval(() => setTime(currentTime()) , 1000 )


    return(
        <div className="Bar_Top">

            <button className="Bar_Top_Btn">
                <img alt="LeftBar" src={LeftBarImage}/>
            </button>


            <span className="Bar_Top_Date">
                {getTime}
            </span>

            <div className="Bar_Top_Btn_Interface">
                <button>
                    <img alt="Dark Theme" src={DarkThemeImage}/>
                </button>
                <button>
                    <img alt="Logout" src={ExitImage}/>
                </button>
            </div>

        </div>
    )
}

export default MenuBar;