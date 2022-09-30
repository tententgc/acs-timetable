import React from "react";

interface CalendarBoxProps {
  isShow: boolean;
  day?: number;
}

const CalendarBox: React.FC<CalendarBoxProps> = (props) => {
  return (
    <div
      className={`w-full h-20 ${
        props.isShow
          ? "border-2 rounded-lg cursor-pointer hover:translate-y-[-5px] duration-200 ease-linear hover:shadow-CalendarCardShadow"
          : ""
      } `}
    >
      <div className="px-2">
        <p className="text-white">{props.day}</p>
      </div>
    </div>
  );
};

export default CalendarBox;
