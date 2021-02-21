import React,{useState,useEffect} from "react";
import TopBar from "./Components/MenuBar/MenuBar";
import UserControls from "./Components/UserConstols/UserControls";
import WidgetWindow from "./Components/WidgetWindow/Window";
import Panel from "./Components/NewWidget/NewWidget";

function App() {

    const [widgets,setWidgets] = useState([
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
    }]);

    const [panel,setPanel] =  useState(false)
    const [theme,setTheme] = useState("")

    const onAddWidget = (widget) =>{
            const newWidgets = [
                ...widgets,widget
            ];
            setWidgets(newWidgets);
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
        <TopBar theme={theme}/>

        <UserControls
            widgets={widgets}
            onRefreshWidgets={onRefreshWidgets}
            onSetHome={onSetHome}
            theme={theme}
            onChangePanel={onChangeAddAnItem}
        />

          {panel?<Panel
              onAdd={onAddWidget}
              onChangePanel={onChangeAddAnItem}
          />:""}

        <WidgetWindow
            widgets={widgets}
            theme={theme}
        />
      </div>
  );
}

export default App;
