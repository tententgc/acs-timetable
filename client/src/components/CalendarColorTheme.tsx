import React from "react";
import { observer } from "mobx-react";
import { CalendarStoreImpl } from "../store/CalendarStore";
import { ColorThemeTitle } from "../config/data";

interface CalendarColorThemeProps {
  store: CalendarStoreImpl;
}

const CalendarColorTheme: React.FC<CalendarColorThemeProps> = observer(
  (props) => {
    const handleClick = (value: string, n: string) => {
      props.store.changeColorFilter(value, n);
    };

    return (
      <div className="absolute border-2 w-[10rem] top-[5%] left-[2%] rounded-lg shadow-xl py-2">
        <div className="flex flex-col gap-[1px] px-2">
          {ColorThemeTitle.map((item, index) => {
            // wait fetch data from backend color table
            return (
              <span
                className={`flex gap-3 items-center cursor-pointer hover:bg-slate-400 px-[5px] py-[2px] rounded-xl duration-100 ease-linear ${
                  props.store.colorFilter.includes(item.color)
                    ? "bg-black bg-opacity-50"
                    : ""
                }`}
                key={index}
                onClick={() => handleClick(item.color, item.title)}
              >
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <p className="capitalize text-white">{item.title}</p>
              </span>
            );
          })}
          {props.store.colorFilter.length > 0 ? (
            <span
              className="flex gap-3 items-center cursor-pointer hover:bg-slate-400 px-[5px] py-[2px] rounded-xl duration-100 ease-linear animate-popup"
              onClick={() => handleClick("bg-white", "reset filter")}
            >
              <div className={`w-3 h-3 rounded-full bg-white`} />
              <p className="capitalize text-white">Reset filter</p>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
);

export default CalendarColorTheme;
