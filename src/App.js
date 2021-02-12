import React from "react";
import TopBar from "./Components/MenuBar/MenuBar";
import UserControls from "./Components/UserConstols/UserControls";
import WidgetWindow from "./Components/WidgetWindow/Window";

function App() {
  return (
      <div className="window">
        <TopBar/>
        <UserControls/>
        <WidgetWindow/>
      </div>
  );
}

export default App;
