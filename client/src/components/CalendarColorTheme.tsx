import React from "react";

const CalendarColorTheme: React.FC = () => {
  return (
    <div className="absolute border-2 w-[10rem] top-[5%] left-[2%] rounded-lg">
      <div className="flex flex-col gap-[1px]">
        {Array(5)
          .fill(0)
          .map((item) => {
            // wait fetch data from backend color table
            return (
              <span className="flex gap-3 items-center">
                <div className="w-3 h-3 rounded-full bg-[#333333]" />
                <p className="capitalize">Hellowrold</p>
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default CalendarColorTheme;
