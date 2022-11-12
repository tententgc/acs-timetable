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
    <div className="h-[6rem] items-center w-[5.3rem] mx-[23px]">
    <div
      className={`cursor-pointer p-[1px] hover:p-0 duration-200 ease-in-out bg-gradient-to-tl from-[#653581] via-indigo-300 to-indigo-500 w-[5.3rem] rounded-lg dark:from-[#99cefa] dark:to-[#a1d3fc] ${
        props.isShow ? "block" : "hidden"
      }`}
      onClick={handleClick}
    >
      <div
        className={`h-20 rounded-lg overflow-scroll p-[2px] animate-boxOpen bg-[#261e3e] hover:bg-black hover:bg-opacity-10 dark:bg-white dark:bg-opacity-80 dark:hover:bg-gradient-to-tl dark:hover:from-[#c0d8eb] dark:hover:via-[#e9fcff] dark:hover:to-[#cfe9ff] dark:text-black ease-in duration-200 ${
          new Date().getDate() === props.day &&
          new Date().getMonth() === props.store.currMonth &&
          new Date().getFullYear() === props.store.currYear
            ? "bg-opacity-50 dark:bg-opacity-50"
            : ""
        }`}
      >
        <div className="px-1">
          <p className="text-[#F9F9F9] font-mono dark:text-black">{props.day}</p>
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
                    <p className="text-white text-[10px] truncate dark:text-black">
                      {item.header}
                    </p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
    </div>
  );
});

export default CalendarBox;
