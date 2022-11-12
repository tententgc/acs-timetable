import { observer } from "mobx-react";
import React from "react";
import { CalendarStoreImpl } from "../store/CalendarStore";

interface ColorThemeProps {
  color?: string;
  title: string;
  store: CalendarStoreImpl;
}

const ColorTheme: React.FC<ColorThemeProps> = observer((props) => {
  const handleClick = (value: string, n: string) => {
    props.store.changeColorFilter(value, n);
  };

  return (
    <span
      className={`flex gap-3 items-center cursor-pointer hover:bg-slate-400 px-[5px] py-[2px] rounded-xl duration-100 ease-linear dark:bg-gradient-to-tl dark:hover:from-[#EBC5DA] dark:hover:to-[#99BAF6] dark:duration-100 ${
        props.store.colorFilter.includes(props.color as string)
          ? "bg-black bg-opacity-50 dark:bg-blue-300 dark:bg-opacity-40"
          : ""
      }`}
      onClick={() => handleClick(props.color as string, props.title)}
    >
      <div
        className={`w-3 h-3 rounded-full ${props.color ? "" : "dark:bg-[#333333] bg-white"} duration-300 `}
        style={props.color ? {backgroundColor : '#' + props.color}: {}}
      />
      <p className="capitalize text-white dark:text-black" >{props.title}</p>
    </span>
  );
});

export default ColorTheme;
