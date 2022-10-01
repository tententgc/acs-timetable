import React from "react";
import { monthList } from "../config/data";

interface CalendarHeaderProps {
  currYear: number;
  currMonth: number;
  handleChangeMonth: (n: number) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  return (
    <div>
      <div className="flex min-w-full border-b-[1px] items-center justify-around p-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 cursor-pointer rounded-full  bg-slate-500 hover:bg-[#333333] hover:text-white duration-200 ease-linear"
            onClick={() => props.handleChangeMonth(-1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div className="flex-grow text-center">
          <p className="text-6xl capitalize text-white">
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
            className="w-16 h-16 cursor-pointer rounded-full bg-slate-500 hover:bg-[#333333] hover:text-white duration-200 ease-linear"
            onClick={() => props.handleChangeMonth(1)}
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
