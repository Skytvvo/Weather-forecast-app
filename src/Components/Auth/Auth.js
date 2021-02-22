import React,{useState} from "react";
import "./index.css";


export default ({onAddWidget,onSetUser}) => {

    /*false - login, true - sing up*/
    const [typeAuth, setTypeAuth] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const logToApp = () =>{
        fetch("http://localhost:9999/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body:JSON.stringify({
                login,
                password
            })
        })
            .then(data=>console.log(data))
            .catch(err=>console.log(err))
    }

    const regToApp=()=>{
        fetch("http://localhost:9999/reg",{
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body:JSON.stringify({
                login,
                password
            })
        })
            .then(data=>console.log(data))
            .catch(err=>console.log(err))
    }

    return(
        <div className={"auth"}>
            <div className={"auth_panel"}>
                <div className="auth_message">
                    Welcome
                </div>
                <div className="auth_user">
                    <input
                        onChange={(value)=>setLogin(value.target.value)}
                        type="text"
                        placeholder={"Login"}
                    />
                    <input
                        onChange={(value)=>setPassword(value.target.value)}
                        type="text"
                        placeholder={"Password"}/>
                    {typeAuth?
                        <button onClick={regToApp}>Sing up</button>
                        :
                        <button onClick={logToApp}>Login</button>}
                </div>
                <div className="auth_change_type">
                    <span>
                        {typeAuth?"Do you have an account? ":"Don’t have an account? "}
                    </span>
                    <span onClick={()=>setTypeAuth(!typeAuth)}>
                        {typeAuth?" Login":" Sing up"}
                    </span>
                </div>
            </div>
        </div>
    )
}