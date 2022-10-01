import React from "react";
import { CalendarStoreImpl } from "../store/CalendarStore";
import { observer } from "mobx-react";

interface CalendarBoxProps {
  isShow: boolean;
  day?: number;
  store: CalendarStoreImpl;
}

const CalendarBox: React.FC<CalendarBoxProps> = observer((props) => {
  const handleClick = (data: string) => {
    props.store.modalOpen = true;
    props.store.modalTitle = data;
  };

  return (
    <div
      className={`w-full h-20 ${
        props.isShow ? "block" : "hidden"
      } border-2 rounded-lg hover:translate-y-[-5px] duration-200 ease-linear hover:shadow-CalendarCardShadow overflow-scroll p-[2px] animate-boxOpen`}
    >
      <div className="px-1">
        <p className="text-white">{props.day}</p>
      </div>
      <div className="flex flex-col gap-1 pb-1">
        {props.store.workFilter.map((item) => {
          return (
            <div key={Math.random()}>
              <div
                className={`${item.color} rounded-lg w-[4.8rem] border-[1px] h-5 cursor-pointer hover:bg-opacity-50 duration-200 ease-linear overflow-hidden px-1`}
                onClick={() => handleClick(item.title)}
              >
                <div>
                  <p className="text-white text-xs truncate">{item.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default CalendarBox;
