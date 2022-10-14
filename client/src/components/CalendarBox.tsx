import React from "react";
import { CalendarStoreImpl } from "../store/CalendarStore";
import { observer } from "mobx-react";
interface CalendarBoxProps {
  isShow: boolean;
  day: number;
  store: CalendarStoreImpl;
}

const CalendarBox: React.FC<CalendarBoxProps> = observer((props) => {
  const handleClick = (e: React.MouseEvent) => {
    if (props.store.workDayInMonth[props.day].length > 0) {
      props.store.modalOpen = true;
      props.store.modalData = props.store.workDayInMonth[props.day];
    }
  };

  return (
    <div
      className={`cursor-pointer p-[.5px] hover:p-0 duration-200 ease-in-out bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 w-[5.3rem] rounded-lg ${
        props.isShow ? "block" : "hidden"
      }`}
      onClick={handleClick}
    >
      <div
        className={`h-20 rounded-lg overflow-scroll p-[2px] animate-boxOpen bg-[#2B1D36] ${
          new Date().getDate() === props.day &&
          new Date().getMonth() === props.store.currMonth &&
          new Date().getFullYear() === props.store.currYear
            ? "bg-opacity-50"
            : ""
        }`}
      >
        <div className="px-1">
          <p className="text-[#F9F9F9] font-mono">{props.day}</p>
        </div>
        <div className="flex flex-col gap-1 pb-1">
          {props.store.checkWorkDay(props.day)
            ? props.store.workDayFilter[props.day].map((item) => {
                return (
                  <div key={Math.random()} className="flex gap-1 items-center">
                    <div className="pl-1">
                      <div
                        className="h-3 w-3 rounded-full cursor-pointer hover:bg-opacity-50 duration-200 ease-linear overflow-hidden"
                        style={{ backgroundColor: `#${item.color.hex_code}` }}
                      ></div>
                    </div>
                    <p className="text-white text-[10px] truncate">
                      {item.header}
                    </p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
});

export default CalendarBox;
