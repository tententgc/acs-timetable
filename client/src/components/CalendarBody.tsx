import React from "react";
import { dateList } from "../config/data";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  strDay2Num,
} from "../helper/timeController";
import CalendarBox from "./CalendarBox";
import CalendarColorTheme from "./CalendarColorTheme";

interface CalendarBodyProps {
  currYear: number;
  currMonth: number;
}

const CalendarBody: React.FC<CalendarBodyProps> = (props) => {
  return (
    <div className="border-2 rounded-3xl h-[80vh] m-14 bg-slate-300 overflow-scroll relative backdrop-blur-sm bg-opacity-40">
      <div>
        <CalendarColorTheme />
      </div>
      <div className="grid grid-cols-7 gap-6 mx-[15rem] mt-3">
        {dateList.map((item) => {
          return (
            <div className="flex justify-center items-center text-white border-b-[1px]">
              {item}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-4 mx-[15rem] mt-6 animate-boxOpen">
        {Array(strDay2Num(getFirstDayOfMonth(props.currYear, props.currMonth)))
          .fill(0)
          .map((item, index) => {
            return (
              <div>
                <CalendarBox isShow={false} key={index} />
              </div>
            );
          })}
        {Array(getDaysInMonth(props.currYear, props.currMonth + 1))
          .fill(0)
          .map((item, index) => {
            return (
              <div key={index}>
                <CalendarBox isShow={true} day={index + 1} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CalendarBody;
