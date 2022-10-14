import React, { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import Chip from "./Chip";
import { deleteEvent, EventType } from "../api/eventRouter";
import { FcFullTrash, FcSupport } from "react-icons/fc";
import DeleteWarning from "./DeleteWarning";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { AuthenStoreImpl } from "../store/AuthenStore";
import { CalendarStoreImpl } from "../store/CalendarStore";
import EventEditForm from "./EventEditForm";

type CalendarAccordianProps = EventType & {
  store: AuthenStoreImpl;
  eventStore: CalendarStoreImpl;
};

const CalendarAccordian: React.FC<CalendarAccordianProps> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  const [deleteInterupt, setDeleteInterupt] = useState<boolean>(false);
  const [openEditform, setOpenEditForm] = useState<boolean>(false);
  const parent = useRef(null);

  const handleClose = () => {
    setOpenEditForm(false);
  };

  if (typeof window !== "undefined") {
    injectStyle();
  }

  useEffect(() => {
    parent.current &&
      autoAnimate(parent.current, {
        duration: 300,
        disrespectUserMotionPreference: true,
      });
  }, [parent]);

  const reveal = () => setShow(!show);

  const handleChange = async (val: string) => {
    setDeleteInterupt(false);
    if (val === "Yes") {
      const res = await deleteEvent(props.event_id);

      if (res.status === 200) {
        toast.success(res.message);
        setTimeout(() => {
          const date = `${props.eventStore.currYear}-${(
            props.eventStore.currMonth + 1
          )
            .toString()
            .padStart(2, "0")}`;
          props.eventStore.setWorkAll(date);
          props.eventStore.modalOpen = false;
        }, 1000);
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <div className="animate-popup">
      <div
        className={`bg-[#1D2A36] p-5 flex items-center rounded-xl gap-4 ${
          show ? "max-w-[40vw] max-h-[50vh] overflow-scroll" : ""
        } min-w-[30vw]`}
      >
        <div>
          <div
            className={`w-6 rounded-full ${
              show ? "h-[10vh] w-2" : "h-6 w-6"
            } duration-300 ease-in-out`}
            style={{ backgroundColor: `#${props.color.hex_code}` }}
          ></div>
        </div>
        <div className="w-full duration-500" ref={parent}>
          <div className={`flex ${show ? "pb-2" : ""}`}>
            <div
              className={`flex gap-5 ${
                show
                  ? "flex-col"
                  : "flex-row items-center justify-between w-[100%]"
              }`}
            >
              <HeaderCustom
                className={`dropdown-label text-xl text-white hover:cursor-pointer ${
                  show ? "text-3xl font-bold" : "max-w-[20vw] truncate"
                }`}
                onClick={reveal}
              >
                {props.header}
              </HeaderCustom>
              {deleteInterupt ? (
                <DeleteWarning
                  open={deleteInterupt}
                  handleChange={handleChange}
                  event_id={props.event_id}
                />
              ) : (
                ""
              )}
              {props.store.user_status === 200 && !show ? (
                <div className="flex">
                  <div
                    className="mr-2 hover:bg-slate-300 hover:bg-opacity-40 duration-100 ease-in p-1 rounded-full cursor-pointer"
                    onClick={() => setOpenEditForm(true)}
                  >
                    <FcSupport size={25} />
                  </div>

                  <div
                    className="mr-2 hover:bg-slate-300 hover:bg-opacity-40 duration-100 ease-in p-1 rounded-full cursor-pointer"
                    onClick={() => setDeleteInterupt(true)}
                  >
                    <FcFullTrash size={25} />
                  </div>
                </div>
              ) : (
                ""
              )}

              {show && (
                <div className="flex gap-2">
                  <Chip
                    title={props.color.color_meaning}
                    color={props.color.hex_code}
                  />
                  {props.time_range ? (
                    <Chip title={props.time_range} color="AAC4FF" />
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
            {show && (
              <div className="flex flex-grow items-start justify-end pl-10">
                <div
                  className="rounded-full p-2 hover:bg-slate-400 cursor-pointer duration-200 ease-linear"
                  onClick={reveal}
                >
                  <MdOutlineClose color="white" />
                </div>
              </div>
            )}
          </div>
          {show && <p className="text-white leading-7 break-all text-justify" >{props.description}</p>}
        </div>
      </div>
      {openEditform ? (
        <EventEditForm
          handleClose={handleClose}
          store={props.eventStore}
          event_date={props.event_date}
          description={props.description}
          open={openEditform}
          time_range={props.time_range}
          header={props.header}
          event_id={props.event_id}
        />
      ) : (
        ""
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={true}
        theme="light"
      />
    </div>
  );
};

export default CalendarAccordian;

const HeaderCustom = styled.p`
  position: relative;
  color: white;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    bottom: 0px;
    left: 0;
    background-color: white;
    transform-origin: bottom right;
    transition: transform 0.2s ease-out;
  }
  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
