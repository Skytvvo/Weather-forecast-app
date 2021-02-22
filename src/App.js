import React,{useState,useEffect} from "react";
import TopBar from "./Components/MenuBar/MenuBar";
import UserControls from "./Components/UserConstols/UserControls";
import WidgetWindow from "./Components/WidgetWindow/Window";
import Panel from "./Components/NewWidget/NewWidget";
import Auth from "./Components/Auth/Auth";
function App() {

    const [widgets,setWidgets] = useState([]);
/*
    [
        {
            name:"Minsk",
            coord:{
                lon:27.566668,
                lat: 53.900002
            },
            country:"BY"
        }, {
            name:"London",
            coord:{
                   lon:  -0.12574,
                    lat: 51.50853
            },
            country: "GB"
    }]*/

    const [panel,setPanel] =  useState(false)
    const [theme,setTheme] = useState("")

    const [user,setUser] = useState(null);

    const onAddWidget = (widget) =>{
            const newWidgets = [
                ...widgets,widget
            ];
            setWidgets(newWidgets);
    }
    const onSetUser = (userData) => {
        setUser(userData)
    }

    const onChangeAddAnItem = (expression) => {
        setPanel(expression)
    }

    const onRefreshWidgets = () =>{

    }

    const onSetHome = () =>{

    }

  return (
      <div className="window">

          {!user?
              (<Auth onAddWidget={onAddWidget} onSetUser={onSetUser} />)
              :("")}
          {user?<TopBar theme={theme}/>:""}

          {user?<UserControls
              widgets={widgets}
              onRefreshWidgets={onRefreshWidgets}
              onSetHome={onSetHome}
              theme={theme}
              onChangePanel={onChangeAddAnItem}
          />:""}

          {panel&&user?<Panel
              onAdd={onAddWidget}
              onChangePanel={onChangeAddAnItem}
          />:""}

          {user?<WidgetWindow
              widgets={widgets}
              theme={theme}
          />:""}
      </div>
  );
}

export default App;
