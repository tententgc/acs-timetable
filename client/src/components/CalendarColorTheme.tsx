import React from "react";
import { CalendarStoreImpl } from "../store/CalendarStore";
import { ColorThemeTitle } from "../config/data";
import ColorTheme from "./ColorTheme";
import { observer } from "mobx-react";

interface CalendarColorThemeProps {
  store: CalendarStoreImpl;
}

const CalendarColorTheme: React.FC<CalendarColorThemeProps> = observer(
  (props) => {
    return (
      <div className="absolute border-2 w-[10rem] top-[5%] left-[2%] rounded-lg shadow-xl py-2">
        <div className="flex flex-col gap-[1px] px-2">
          {ColorThemeTitle.map((item, index) => {
            // wait fetch data from backend color table
            return (
              <ColorTheme
                key={index}
                title={item.title}
                color={item.color}
                store={props.store}
              />
            );
          })}
          {props.store.colorFilter.length ? (
            <div className="animate-popup">
              <ColorTheme
                title="reset filter"
                color="bg-white"
                store={props.store}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
);
export default CalendarColorTheme;
