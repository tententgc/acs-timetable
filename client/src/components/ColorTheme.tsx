import { observer } from "mobx-react";
import React from "react";
import { CalendarStoreImpl } from "../store/CalendarStore";

interface ColorThemeProps {
  color: string;
  title: string;
  store: CalendarStoreImpl;
}

const ColorTheme: React.FC<ColorThemeProps> = observer((props) => {
  const handleClick = (value: string, n: string) => {
    props.store.changeColorFilter(value, n);
  };

  return (
    <span
      className={`flex gap-3 items-center cursor-pointer hover:bg-slate-400 px-[5px] py-[2px] rounded-xl duration-100 ease-linear ${
        props.store.colorFilter.includes(props.color)
          ? "bg-black bg-opacity-50"
          : ""
      }`}
      onClick={() => handleClick(props.color, props.title)}
    >
      <div className={`w-3 h-3 rounded-full ${props.color}`} />
      <p className="capitalize text-white">{props.title}</p>
    </span>
  );
});

export default ColorTheme;
