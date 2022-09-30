import React from "react";

const CalendarModal: React.FC = () => {
  return (
    <div
      className={`fixed bg-black w-full h-full top-0 backdrop-blur-sm bg-opacity-20 duration-150 z-[1000]`}
    ></div>
  );
};

export default CalendarModal;
