import React, { useState } from "react";
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";

const Calendar: React.FC = () => {
  const [currYear, setCurrYear] = useState<number>(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState<number>(new Date().getMonth());

  const handleChangeMonth = (n: number) => {
    if (currMonth === 11 && n === 1) {
      setCurrYear(currYear + 1);
      setCurrMonth(0);
      return;
    }

    if (currMonth === 0 && n === -1) {
      setCurrYear(currYear - 1);
      setCurrMonth(11);
      return;
    }

    setCurrMonth(currMonth + n);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="min-w-[90vw]">
        <CalendarHeader
          currYear={currYear}
          currMonth={currMonth}
          handleChangeMonth={handleChangeMonth}
        />
        <CalendarBody currYear={currYear} currMonth={currMonth} />
      </div>
    </div>
  );
};

export default Calendar;
