import React from "react";
import { observer } from "mobx-react";
import { CalendarStoreImpl } from "../store/CalendarStore";

interface CalendarColorThemeProps {
  store: CalendarStoreImpl;
}

interface ColorItems {
  color: string;
  title: string;
}

const item: Array<ColorItems> = [
  { color: "bg-[#2cbc63]", title: "Study break" },
  { color: "bg-[#FF9494]", title: "Test" },
  { color: "bg-[#9896FF]", title: "Anounce" },
  { color: "bg-[#575454]", title: "Today" },
  { color: "bg-white", title: "reset filter" },
];

const CalendarColorTheme: React.FC<CalendarColorThemeProps> = observer(
  (props) => {
    const handleClick = (value: string, n: string) => {
      props.store.changeColorFilter(value, n);
    };

    return (
      <div className="absolute border-2 w-[10rem] top-[5%] left-[2%] rounded-lg shadow-xl py-2">
        <div className="flex flex-col gap-[1px] px-2">
          {item.map((item, index) => {
            // wait fetch data from backend color table
            return (
              <span
                className={`flex gap-3 items-center cursor-pointer hover:bg-slate-400 px-[5px] py-[2px] rounded-xl duration-300 ease-linear ${
                  props.store.colorFilter.includes(item.color)
                    ? "bg-slate-400"
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
        </div>
      </div>
    );
  }
);

export default CalendarColorTheme;
