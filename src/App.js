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
        const newWidgets = [
            ...widgets,widget
        ];
        setWidgets(newWidgets);
        user.cities = newWidgets;
        updateWidgets(user)
    }
    const updateWidgets=(obj)=>{
        fetch("http://localhost:9999/widgets/add",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body:JSON.stringify(obj)
        })
            .catch(err=>console.log(err))
    }

    const onDeleteWidget = (widget)=>{
        const newWidgets = widgets.filter(item=>item.id!==widget.city.id)
        setWidgets(newWidgets);
        user.cities = newWidgets;
        updateWidgets(user);
    }

    const onSetUser = (userData) => {
        const newWidgets = [...widgets,...userData.cities]
        setWidgets(newWidgets);
        setTheme(userData.theme);
        setUser(userData)
    }



    const onChangeAddAnItem = (expression) => {
        setPanel(expression)
    }


  return (
      <div className="window">

          {!user?
              (<Auth onSetUser={onSetUser} />)
              :("")}
          {user?
              <TopBar
                widgets={widgets}
                theme={theme}
                onChangePanel={onChangeAddAnItem}
              />:
              ""}

        {/*  {user?<UserControls
              widgets={widgets}
              onRefreshWidgets={onRefreshWidgets}
              onSetHome={onSetHome}
              theme={theme}
              onChangePanel={onChangeAddAnItem}
          />:""}*/}
          {user?<WidgetWindow
              onDelete={onDeleteWidget}
              widgets={widgets}
              theme={theme}
          />:""}
          {panel&&user?<Panel
              onAdd={onAddWidget}
              onChangePanel={onChangeAddAnItem}
          />:""}


      </div>
  );
}

export default App;
