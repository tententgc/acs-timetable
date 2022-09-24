import { useState } from "react";
import Calendar from "react-calendar";
import "../styles/calendar.css"
function MainCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="app mt-10">
      <h1 className="header font-bold text-2xl">ACS-Timetable</h1>
      <div className="calendar-container mt-10">
        <Calendar className="react-calendar" onChange={setDate} value={date} />
      </div>
      <div className="text-center mt-5">
        Selected date: {date.toDateString()}
      </div>
    </div>
  );
}

export default MainCalendar;
