import React, {useState, useEffect} from "react";
import "./index.css";
import "./dark.css";
import "./responsive.css";
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
                    <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" height={25}>

                        <path d="M101.488,78.864L78.864,56.24c-6.24-6.248-16.384-6.248-22.624,0c-6.248,6.248-6.248,16.376,0,22.624l22.624,22.624
                            c3.12,3.128,7.216,4.688,11.312,4.688c4.096,0,8.192-1.56,11.312-4.688C107.736,95.24,107.736,85.112,101.488,78.864z"/>

                        <path d="M48,176H16c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h32c8.832,0,16-7.168,16-16C64,183.168,56.832,176,48,176z"/>

                        <path d="M101.488,282.512c-6.24-6.248-16.384-6.248-22.624,0L56.24,305.136c-6.248,6.248-6.248,16.376,0,22.624
                            c3.12,3.128,7.216,4.688,11.312,4.688s8.192-1.56,11.312-4.688l22.624-22.624C107.736,298.888,107.736,288.76,101.488,282.512z"/>

                        <path d="M192,320c-8.832,0-16,7.168-16,16v32c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16v-32C208,327.168,200.832,320,192,320
                            z"/>

                        <path d="M327.76,305.136l-22.624-22.624c-6.24-6.248-16.384-6.248-22.624,0c-6.248,6.248-6.248,16.376,0,22.624l22.624,22.624
                            c3.12,3.128,7.216,4.688,11.312,4.688s8.192-1.56,11.312-4.688C334.008,321.512,334.008,311.384,327.76,305.136z"/>

                        <path d="M368,176h-32c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h32c8.832,0,16-7.168,16-16C384,183.168,376.832,176,368,176
                            z"/>

                        <path d="M327.76,56.24c-6.24-6.248-16.384-6.248-22.624,0l-22.624,22.624c-6.248,6.248-6.248,16.376,0,22.624
                            c3.12,3.128,7.216,4.688,11.312,4.688s8.192-1.56,11.312-4.688l22.624-22.624C334.008,72.616,334.008,62.488,327.76,56.24z"/>

                        <path d="M192,0c-8.832,0-16,7.168-16,16v32c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16V16C208,7.168,200.832,0,192,0z"/>

                        <path d="M192,88c-57.344,0-104,46.656-104,104s46.656,104,104,104s104-46.656,104-104S249.344,88,192,88z M192,264
                            c-39.696,0-72-32.304-72-72s32.304-72,72-72s72,32.304,72,72S231.696,264,192,264z"/>
                    </svg>

                </button>
                <button onClick={()=>logOut()}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height={25} viewBox="0 0 56 56" >
                        <path d="M54.424,28.382c0.101-0.244,0.101-0.519,0-0.764c-0.051-0.123-0.125-0.234-0.217-0.327L42.208,15.293
                            c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L51.087,27H20.501c-0.552,0-1,0.447-1,1s0.448,1,1,1h30.586L40.794,39.293
                            c-0.391,0.391-0.391,1.023,0,1.414C40.989,40.902,41.245,41,41.501,41s0.512-0.098,0.707-0.293l11.999-11.999
                            C54.299,28.616,54.373,28.505,54.424,28.382z"/>
                        <path d="M36.501,33c-0.552,0-1,0.447-1,1v20h-32V2h32v20c0,0.553,0.448,1,1,1s1-0.447,1-1V1c0-0.553-0.448-1-1-1h-34
                            c-0.552,0-1,0.447-1,1v54c0,0.553,0.448,1,1,1h34c0.552,0,1-0.447,1-1V34C37.501,33.447,37.053,33,36.501,33z"/>
                    </svg>
                </button>
            </div>

        </div>
    )
}

export default MenuBar;