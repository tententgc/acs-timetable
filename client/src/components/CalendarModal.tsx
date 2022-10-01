import { observer } from "mobx-react";
import React from "react";
import { CalendarStoreImpl } from "../store/CalendarStore";

interface CalendarModalProps {
  store: CalendarStoreImpl;
}

const CalendarModal: React.FC<CalendarModalProps> = observer((props) => {
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.store.closeModal();
    }
  };

  return (
    <div
      className={`fixed bg-black w-full h-full top-0 backdrop-blur-sm bg-opacity-20 duration-150 z-[1000] flex min-h-screen justify-center items-center`}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2">
        {props.store.modalData.map((item) => {
          return (
            <div className="animate-popup">
              <div className="bg-[#1D2A36] p-5 flex items-center rounded-xl gap-4">
                <div>
                  <div className={`w-5 h-5 ${item.color} rounded-full`}></div>
                </div>
                <p className="text-xl text-white">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default CalendarModal;
