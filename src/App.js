import React,{useState,useEffect} from "react";
import TopBar from "./Components/MenuBar/MenuBar";
import UserControls from "./Components/UserConstols/UserControls";
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
            console.log(widget,newWidgets)
            setWidgets(newWidgets);
    }
    const onSetUser = (userData) => {
        userData.cities.forEach(item=>{
            onAddWidget(item)
        })
        setTheme(userData.theme);
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
              (<Auth onSetUser={onSetUser} />)
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
