import React from "react";
import { monthList } from "../config/data";
import { CalendarStoreImpl } from "../store/CalendarStore";

interface CalendarHeaderProps {
  currYear: number;
  currMonth: number;
  handleChangeMonth: (n: number) => void;
  store: CalendarStoreImpl;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  const handleClick = (n: number) => {
    props.handleChangeMonth(n);
  };

  return (
    <div>
      <div className="flex min-w-full items-center justify-around px-5 py-2 rounded-3xl bg-black">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 cursor-pointer rounded-full  hover:bg-[#413e65] hover:text-white duration-200 ease-linear"
            onClick={() => handleClick(-1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-5xl capitalize text-white w-[30rem]">
            {monthList[props.currMonth]} {props.currYear}
          </p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 cursor-pointer rounded-full  hover:bg-[#413e65] duration-200 ease-linear"
            onClick={() => handleClick(1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
