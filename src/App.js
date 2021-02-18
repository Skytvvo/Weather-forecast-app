import React,{useState,useEffect} from "react";
import TopBar from "./Components/MenuBar/MenuBar";
import UserControls from "./Components/UserConstols/UserControls";
import WidgetWindow from "./Components/WidgetWindow/Window";

function App() {

    const [widgets,setWidgets] = useState([
        {
            Name:"Minsk",
            coord:{
                lon:27.566668,
                lat: 53.900002
            },
            Country:"BY"
        }, {
            Name:"London",
            coord:{
                   lon:  -0.12574,
                    lat: 51.50853
            },
            Country: "GB"
    }]);
    const [theme,setTheme] = useState("")

    useEffect(()=>{
        widgets.forEach((item)=>{
            fetch("http://localhost:9999/forecast",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":'application/json;charset=utf-8'
                    },
                    body:JSON.stringify(item)
                })
                .then(data => console.log(data))
        })
    })

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
