import React from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

import { useState } from "react";
import { CalendarStore } from "../store/CalendarStore";
import { AuthenStore } from "../store/AuthenStore";


const Home: React.FC = () => {
  const [theme, setTheme] = useState<boolean>(false);
  const handleChangeTheme = () => {setTheme(!theme)}
  return (
    <div className={`${theme ? "light":"dark"}`}>
      <div className={`min-h-screen bg-[#181828] dark:bg-[#d6dfee] duration-1000`}>
        <div>
          <div className={`${theme ? "starsec" : "starsecdark"}`}></div>
          <div className={`${theme ? "starthird" : "starthriddark"}`}></div>
          <div className={`${theme ? "starfourth" : "starfourthdark"}`}></div>
          <div className={`${theme ? "starfifth" : "starfifthdark"}`}></div>
        </div>
        <Navbar store={AuthenStore} handleChangeTheme={handleChangeTheme} theme={theme} />
        <Calendar store={CalendarStore} theme={theme} />
      </div>
    </div>
  );
};

export default Home;
