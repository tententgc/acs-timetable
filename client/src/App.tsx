import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Calendar from "./components/Calendar";
import CalendarModal from "./components/CalendarModal";

function App() {
  return (
    <div className="min-h-screen">
      <div>
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>
      <Navbar />
      <Calendar />
      {/* <CalendarModal /> */}
    </div>
  );
}

export default App;
