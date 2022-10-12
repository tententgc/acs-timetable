import { observer } from "mobx-react";
import React from "react";
import { CalendarStoreImpl } from "../store/CalendarStore";
import CalendarAccordian from "./CalendarAccordian";

interface CalendarModalProps {
  store: CalendarStoreImpl;
}

const CalendarModal: React.FC<CalendarModalProps> = observer((props) => {
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.store.modalOpen = false;
    }
  };

  return (
    <div
      className={`fixed bg-black w-full h-full top-0 backdrop-blur-sm bg-opacity-20 duration-150 z-[1000] flex min-h-screen justify-center items-center`}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2">
        {props.store.modalData.map((item) => {
          return <CalendarAccordian {...item} key={Math.random()} />;
        })}
      </div>
    </div>
  );
});

export default CalendarModal;
