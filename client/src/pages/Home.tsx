import React from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

import { CalendarStore } from "../store/CalendarStore";
import { AuthenStore } from "../store/AuthenStore";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div>
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>
      <Navbar store={AuthenStore} />
      <Calendar store={CalendarStore} />
    </div>
  );
};

export default Home;
