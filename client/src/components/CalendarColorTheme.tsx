import React, { useEffect, useState } from "react";
import { CalendarStoreImpl } from "../store/CalendarStore";
import ColorTheme from "./ColorTheme";
import { observer } from "mobx-react";
import { ColorResponse, fetchAllColor } from "../api/colorRouter";

interface CalendarColorThemeProps {
  store: CalendarStoreImpl;
}

const CalendarColorTheme: React.FC<CalendarColorThemeProps> = observer(
  (props) => {
    const [colordata, setColorData] = useState<Array<ColorResponse>>([]);

    useEffect(() => {
      async function fetch() {
        const res = await fetchAllColor();
        setColorData(res);
      }

      fetch();
    }, []);

    return (
      <div className="absolute border-2 w-[10rem] top-[5%] left-[2%] rounded-lg shadow-xl py-2">
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
              <ColorTheme
                title="reset filter"
                color="FFFFFF"
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
