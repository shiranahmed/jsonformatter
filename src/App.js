// App.js
import React from "react";
import EscapeComponent from "./component/EscapeComponent";
import UnescapeComponent from "./component/UnescapeComponent";

const App = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>String Escape/Unescape App</h1>
      <EscapeComponent />
      <UnescapeComponent />
    </div>
  );
};

export default App;
