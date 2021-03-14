import React,{useState, useEffect} from "react";
import "./Styles/index.css";
import "./Styles/dark.css";
import "./Styles/responsive.css";

export default ({onSetUser}) => {

    /*false - login, true - sing up*/
    const [typeAuth, setTypeAuth] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [theme, setTheme] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [loginError,setLoginError] = useState("");

    useEffect(()=>{
        setLoginError("");
        setPasswordError("");
    },[login,password])

    const logToApp = (log = login,pass=password) =>{

        fetch("http://localhost:9999/api/auth/log",{
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body:JSON.stringify({
                login:log,
                password:pass
            })
        })
            .then(data=>{
                if(data.status === 404)
                {
                    setLoginError("err");
                    throw new Error("This user don't exist")
                }
                if(data.status === 403)
                {
                    setPasswordError("err")
                    throw new Error("Incorrect password")
                }
                return data;
            })
            .then(data=>data.json())
            .then(data=>{
                onSetUser(data)
                return data;
            })
            .then(data => {
                localStorage.setItem("user",JSON.stringify(data))
            })
            .catch(err=>console.log(err))
    }

     const regToApp=()=>{
         fetch("http://localhost:9999/api/auth/reg",{
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body:JSON.stringify({
                login,
                password
            })
        })
            .then(data=>data.json())
            .then(()=>logToApp())
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        let hours = new Date().getHours();
        if(hours >= 21 || hours <= 6)
            setTheme(" dark")

        if(localStorage.getItem("user")!==null)
        {
            let user = JSON.parse(localStorage.getItem("user"));

            onSetUser(user);
        }
    },[])

    return(
        <div className={"auth" + theme}>
            <div className={"auth_panel" + theme}>
                <div className="auth_message">
                    Welcome
                </div>
                <div className={"auth_user" + theme}>
                    <input
                        className={loginError}
                        onChange={(value)=>setLogin(value.target.value)}
                        type="text"
                        placeholder={"Login"}
                    />
                    <input
                        className={passwordError + loginError}
                        onChange={(value)=>setPassword(value.target.value)}
                        type="password"
                        placeholder={"Password"}
                    />

                    {typeAuth?
                        <button onClick={()=>regToApp()}>Sing up</button>
                        :
                        <button onClick={()=>logToApp()}>Login</button>}
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