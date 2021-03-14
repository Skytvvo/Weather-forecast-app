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

    const onAddWidget = (widget) =>{
        onChangePanel(false);
        const newWidgets = [
            ...widgets,widget
        ];
        setWidgets(newWidgets);
        user.cities = newWidgets;
        updateWidgets(user)
    }

    const checkCity = (newCity) =>{
        if(widgets.length===9)
        {
            return false;
        }
        return widgets.filter(item => (item.id === newCity.id)).length === 0;

    }

    const updateWidgets=(obj)=>{
        fetch("http://localhost:9999/users",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body:JSON.stringify(obj)
        })
            .catch(err=>console.log(err))
    }



    const onDeleteWidget = (widget)=>{
        //bug with London(US) and London(US) with different states (API problem)
       const newWidgets = widgets.filter(item=>(item.id!==widget.city.id && widget.city.id !== 4517009))
        setWidgets(newWidgets);
        user.cities = newWidgets;
        updateWidgets(user);
    }

     const  onSetUser = (userData) => {

         fetch("http://localhost:9999/api/users",{
             method:"PUT",
             headers:{
                 "Content-Type":"application/json;charset=utf-8",
                 "Authorization":userData.token
             },
             body:JSON.stringify({})
         })
             .then(data => JSON.parse(data))
             .then(data=>{
                 setTheme(data.theme);
                 const newWidgets = [...widgets,...userData.cities];
                 setWidgets(newWidgets);
                 setUser({
                     login:data.login

                 })
             })
             .catch(err=>console.log(err))
        /*const newWidgets = [...widgets,...userData.cities]
        setWidgets(newWidgets);
        setTheme(userData.theme);
        setUser(userData)*/
    }


    const onChangePanel = (expression) => {
        setPanel(expression)
    }

    const changeTheme= () => {
        const updatedUser = user;
        if(theme.length === 0)
        {
            updatedUser.theme = " dark";
        }
        else {
            updatedUser.theme = "";
        }
        setTheme(updatedUser.theme);
        setUser(updatedUser);
        updateWidgets(updatedUser);
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
