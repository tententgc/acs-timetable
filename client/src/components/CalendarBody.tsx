import { observer } from "mobx-react";
import React from "react";
import { dateList } from "../config/data";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  strDay2Num,
} from "../helper/timeController";
import { CalendarStoreImpl } from "../store/CalendarStore";
import { ColorStore } from "../store/ColorStore";
import CalendarBox from "./CalendarBox";
import CalendarColorTheme from "./CalendarColorTheme";
import WaitingData from "./WaitingData";
import animationLottie from "../assets/loading-color.json";

interface CalendarBodyProps {
  currYear: number;
  currMonth: number;
  store: CalendarStoreImpl;
}

const CalendarBody: React.FC<CalendarBodyProps> = observer((props) => {
  return (
    <div className="border-2 rounded-3xl h-[90vh] m-14 bg-[#464675] overflow-scroll relative backdrop-blur-sm bg-opacity-40">
      {props.store.workAll === null ? (
        <WaitingData animate={animationLottie} />
      ) : (
        ""
      )}
      <div>
        <CalendarColorTheme store={props.store} colorStore={ColorStore} />
      </div>
      <div className="grid grid-cols-7 gap-6 mx-[15rem] mt-3">
        {dateList.map((item, index) => {
          return (
            <div
              className="flex justify-center items-center text-white border-b-[1px]"
              key={index}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-y-5 mx-[15rem] mt-6 gap-6">
        {Array(strDay2Num(getFirstDayOfMonth(props.currYear, props.currMonth)))
          .fill(0)
          .map((_, index) => {
            return (
              <div key={Math.random()}>
                <CalendarBox
                  isShow={false}
                  key={index}
                  store={props.store}
                  day={index}
                />
              </div>
            );
          })}
        {Array(getDaysInMonth(props.currYear, props.currMonth + 1))
          .fill(0)
          .map((_, index) => {
            return (
              <div key={Math.random()}>
                <CalendarBox
                  isShow={true}
                  day={index + 1}
                  store={props.store}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default CalendarBody;
