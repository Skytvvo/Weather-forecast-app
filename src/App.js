import React,{useState} from "react";
import TopBar from "./Components/MenuBar/MenuBar";
import UserControls from "./Components/UserConstols/UserControls";
import WidgetWindow from "./Components/WidgetWindow/Window";

function App() {

    const [widgets,setWidgets] = useState([{Town:"Minsk"}, {Town:"London"}]);
    const [theme,setTheme] = useState("")


    const onAddWidget = (widget) =>{
            const newWidgets = [
                ...widgets,widget
            ];
            setWidgets(newWidgets);
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
            onAddWidget={onAddWidget}
            onRefreshWidgets={onRefreshWidgets}
            onSetHome={onSetHome}
            theme={theme}/>

        <WidgetWindow widgets={widgets}
                      theme={theme}/>
      </div>
  );
}

export default App;
