import React from "react";
import { Interface } from "readline";
import { monthList } from "../config/data";
import { CalendarStoreImpl } from "../store/CalendarStore";

interface CalendarHeaderProps {
  currYear: number;
  currMonth: number;
  handleChangeMonth: (n: number) => void;
  store: CalendarStoreImpl;
  theme:boolean;
}


const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  const handleClick = (n: number) => {
    props.handleChangeMonth(n);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
      <div className="flex w-[60rem] items-center justify-around px-5 py-2 rounded-3xl bg-[#2c2a45] dark:bg-[#a1d3fc] duration-1000 dark:bg-opacity-40 dark:text-[#617c8b]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={`${props.theme?"currentColor":"#3f3f3f"}`}
            className="w-10 h-10 cursor-pointer rounded-full hover:bg-[#413e65] dark:hover:bg-white duration-1000 ease-linear "
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
          <p className="text-5xl capitalize text-white w-[30rem] dark:text-[#3f3f3f]">
            {monthList[props.currMonth]} {props.currYear}
          </p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={`${props.theme?"currentColor":"#3f3f3f"}`}
            className="w-10 h-10 cursor-pointer rounded-full hover:bg-[#413e65] dark:hover:bg-white duration-1000 ease-linear "
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
    </div>
  );
};

export default CalendarHeader;
