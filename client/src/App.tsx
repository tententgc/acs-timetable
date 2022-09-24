import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MainCalendar from "./components/Calendar";

function App() {
  return (
    <div className="h-screen bg-white">
      <div className="App">
        <Navbar />
        <MainCalendar />
      </div>
    </div>
  );
}

export default App;
