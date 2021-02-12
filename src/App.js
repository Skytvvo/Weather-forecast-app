import React from "react";
import TopBar from "./Components/MenuBar/MenuBar";
import UserControls from "./Components/UserConstols/UserControls";

function App() {
  return (
      <div className="window">
        <TopBar/>
        <UserControls/>
      </div>
  );
}

export default App;
