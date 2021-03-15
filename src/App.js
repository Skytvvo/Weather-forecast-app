import React,{useState,useEffect} from "react";
import TopBar from "./Components/MenuBar/MenuBar";
import WidgetWindow from "./Components/WidgetWindow/Window";
import Panel from "./Components/NewWidget/NewWidget";
import Auth from "./Components/Auth/Auth";



function App() {

    const [widgets,setWidgets] = useState([]);
    const [panel,setPanel] =  useState(false)
    const [theme,setTheme] = useState("")
    const [user,setUser] = useState(null);

    async function onAddWidget (widget){
        onChangePanel(false);
        const newWidgets = [
            ...widgets,widget
        ];
        setWidgets(newWidgets);
        await fetch("http://localhost:9999/api/users/set",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json;charset=utf-8",
                "Authorization":user.token
            },
            body:JSON.stringify({
                cityId:widget._id
            })
        })
            .catch(err=>console.log(err))
    }

    const checkCity = (newCity) =>{
        if(widgets.length===9)
        {
            return false;
        }
        return widgets.filter(item => (item._id === newCity._id)).length === 0;

    }


    const onDeleteWidget = (widget)=>{
        const newWidgets = widgets.filter(item=>item._id!==widget._id);
        setWidgets(newWidgets);
        fetch("http://localhost:9999/api/remove",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json;charset=utf-8",
                "Authorization":user.token
            },
            body:JSON.stringify({_id:widget._id})
        })
            .catch(err=>console.log(err))
    }

      function  onSetUser (userData)  {
        let newWidgets =[];
           fetch("http://localhost:9999/api/users/get",{
             method:"PUT",
             headers:{
                 "Content-Type":"application/json;charset=utf-8",
                 "Authorization":userData.token
             },
             body:JSON.stringify({})
         })
             .then(data => data.json())
             .then(data=>{

                 setTheme(data.theme);

                 setUser({
                     login:data.login,
                     token:userData.token
                 })
                 data.cities.forEach(async function (id){
                    await fetch("http://localhost:9999/api/city/id",
                         {
                             method:"POST",
                             headers:{
                                 "Content-Type":'application/json;charset=utf-8'
                             },
                             body:JSON.stringify({id})
                         }
                     )
                        .then(data=>data.json())
                        .then(data=>{
                            newWidgets = [...newWidgets,data]
                        })
                        .catch(err => console.log(err))
                     setWidgets(newWidgets)
                 })

             })
             .catch(err=>console.log(err))
    }

    const onChangePanel = (expression) => {
        setPanel(expression)
    }

    const changeTheme= () => {
        let newTheme = "";
        if(theme.length === 0)
        {
            newTheme=" dark";

        }
        else {
            newTheme="";
        }
        setTheme(newTheme);

        fetch("http://localhost:9999/api/theme",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json;charset=utf-8",
                "Authorization":user.token
            },
            body:JSON.stringify({theme:newTheme})
        })
            .catch(err=>console.log(err))
    }

  return (
      <div className={"window" + theme}>

          {!user?
              (<Auth onSetUser={onSetUser} />)
              :("")}
          {user?
              <TopBar
                theme={theme}
                username={user.login}
                onChangeTheme={changeTheme}
              />:
              ""}

          {user?
              <WidgetWindow
                  onChangePanel={onChangePanel}
                  onDelete={onDeleteWidget}
                  widgets={widgets}
                  theme={theme}
            />
          :""}
          {panel&&user?<Panel
              onCheckCity={checkCity}
              theme={theme}
              onAdd={onAddWidget}
              onChangePanel={onChangePanel}
          />:""}


      </div>
  );
}

export default App;
