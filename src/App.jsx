import React from "react";
import DashboardBase from "./components/DashboardBase";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DashboardBase />
    </div>
  );
}

export default App;
