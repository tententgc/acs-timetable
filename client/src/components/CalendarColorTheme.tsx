import React, { useEffect, useState } from "react";
import { CalendarStoreImpl } from "../store/CalendarStore";
import ColorTheme from "./ColorTheme";
import { observer } from "mobx-react";
import { ColorResponse } from "../api/colorRouter";
import { ColorStoreImpl } from "../store/ColorStore";
import { Theme } from "react-toastify";

interface CalendarColorThemeProps {
  store: CalendarStoreImpl;
  colorStore: ColorStoreImpl;
}

const CalendarColorTheme: React.FC<CalendarColorThemeProps> = observer(
  (props) => {
    const [colordata, setColorData] = useState<Array<ColorResponse>>([]);

    useEffect(() => {
      async function fetch() {
        await props.colorStore.fetchColorTheme();
        setColorData(props.colorStore.theme);
      }

      fetch();
    }, [props.colorStore]);

    return (
      <div className="absolute border-2 w-[10rem] top-[5%] left-[2%] rounded-lg shadow-xl py-2 dark:border-[#3f3f3f]">
        <div className="flex flex-col gap-[1px] px-2">
          {colordata.map((item, index) => {
            // wait fetch data from backend color table
            return (
              <ColorTheme
                key={index}
                title={item.color_meaning}
                color={item.hex_code}
                store={props.store}
              />
            );
          })}
          {props.store.colorFilter.length ? (
            <div className="animate-popup">
              <ColorTheme title="reset filter" store={props.store} />
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
