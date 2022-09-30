import React from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

import { CalendarStore } from "../store/CalendarStore";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div>
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>
      <Navbar />
      <Calendar store={CalendarStore} />
    </div>
  );
};

export default Home;
