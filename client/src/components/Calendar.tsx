import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { CalendarStoreImpl } from "../store/CalendarStore";
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";
import CalendarModal from "./CalendarModal";

interface CalendarProps {
  store: CalendarStoreImpl;
}

const Calendar: React.FC<CalendarProps> = observer((props) => {
  const [currYear, setCurrYear] = useState<number>(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState<number>(new Date().getMonth());

  useEffect(() => {
    props.store.currMonth = currMonth;
    props.store.currYear = currYear;
    props.store.setWorkAll(
      `${currYear}-${(currMonth + 1).toString().padStart(2, "0")}`
    );
  }, [currMonth, currYear, props.store]);

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
          store={props.store}
        />
        <CalendarBody
          currYear={currYear}
          currMonth={currMonth}
          store={props.store}
        />
      </div>
      {props.store.modalOpen && <CalendarModal store={props.store} />}
    </div>
  );
});

export default Calendar;
