import React from "react";
import { CalendarStoreImpl } from "../store/CalendarStore";
import { observer } from "mobx-react";

interface CalendarBoxProps {
  isShow: boolean;
  day: number;
  store: CalendarStoreImpl;
}

const CalendarBox: React.FC<CalendarBoxProps> = observer((props) => {
  const handleClick = (data: string) => {
    props.store.modalOpen = true;
    props.store.modalTitle = data;
  };

  return (
    <div
      className={`cursor-pointer p-[.5px] w-[5.3rem] bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-lg ${
        props.isShow ? "block" : "hidden"
      }`}
    >
      <div
        className={` h-20 rounded-lg hover:translate-y-[-4px] duration-200 ease-linear overflow-scroll p-[2px] animate-boxOpen bg-[#2B1D36]`}
      >
        <div className="px-1">
          <p className="text-white">{props.day}</p>
        </div>
        <div className="flex flex-col gap-1 pb-1">
          {props.store.workDayFilter[props.day].map((item) => {
            return (
              <div key={Math.random()} className="flex gap-2 items-center">
                <div>
                  <div
                    className={`${item.color} border-[.5px] h-3 w-3 rounded-full cursor-pointer hover:bg-opacity-50 duration-200 ease-linear overflow-hidden px-1`}
                    onClick={() => handleClick(item.title)}
                  ></div>
                </div>
                <p className="text-white text-[10px] truncate">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default CalendarBox;
