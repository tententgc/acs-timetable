import React, { useState } from "react";
import InputCustom from "./InputCustom";
import { FiX } from "react-icons/fi";
import { CalendarStoreImpl } from "../store/CalendarStore";
import { putEvent, PutEventRequest } from "../api/eventRouter";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

interface EventFormType {
  open: boolean;
  handleClose: () => void;
  store: CalendarStoreImpl;
  theme: boolean;
}

type EventFormProps = PutEventRequest & EventFormType;

if (typeof window !== "undefined") {
  injectStyle();
}

const EventEditForm: React.FC<EventFormProps> = (props) => {
  const [formData, setFormData] = useState<
    Omit<EventFormProps, "handleClose" | "store" | "open" | "event_id">
  >({
    header: props.header,
    description: props.description,
    time_range: props.time_range,
    event_date: props.event_date,
    theme: props.theme,
  });
  const [timeRange, setTimeRange] = useState<{ t1: string; t2: string }>({
    t1: "",
    t2: "",
  });

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.handleClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      e.target.name === "select-time-1" ||
      e.target.name === "select-time-2"
    ) {
      if (e.target.name === "select-time-1") {
        setTimeRange({ ...timeRange, t1: `from ${e.target.value} ` });
      } else {
        setTimeRange({ ...timeRange, t2: `to ${e.target.value}` });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.time_range = timeRange.t1 + timeRange.t2;

    const res = await putEvent({ ...formData, event_id: props.event_id });
    if (res.status === 200) {
      toast.success(res.message);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div
      className={`fixed bg-black w-[100vw] h-[100vh] top-0 left-0 backdrop-blur-sm bg-opacity-20 duration-150 z-[1003] ${
        props.open ? "block" : "hidden"
      }`}
    >
      <div
        className="animate-popup flex w-full h-full justify-center items-center"
        onClick={handleClick}
      >
        <form
          className="w-[30rem] min-h-[10rem] bg-slate-700 rounded-lg p-5 dark:bg-blue-200"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center my-2">
            <div className="w-[15rem]">
              <InputCustom
                onChange={handleChange}
                name="header"
                placeholder="Topic"
                type="text"
                value={formData.header}
                maxLength={200}
                required={true}
              />
            </div>
            <div className={`${props.theme ? "handledark" : "handlelight"}`}>
              <input
                type="date"
                name="event_date"
                className={`rounded-sm outline-none p-[2px] bg-black border-[1px] border-[#554994] focus:border-white
                            dark:bg-white dark:text-black dark:border-[#7696ff] dark:focus:border-black`}
                required
                value={formData.event_date}
                onChange={handleChange}
              />
            </div>
            <div
              className={`p-2 hover:bg-white hover:bg-opacity-30 ease-in duration-100 rounded-full`}
              onClick={() => props.handleClose()}
            >
              <FiX size={20} className="dark:stroke-black" />
            </div>
          </div>
          <div>
            <textarea
              className={`w-full outline-none h-20 px-[10px] py-[3px] rounded-md bg-black border-[1px] border-[#554994] focus:border-white
                          dark:bg-white dark:text-black dark:border-[#7696ff] dark:focus:border-black`}
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div
              className={`flex ${props.theme ? "handledark" : "handlelight"}`}
            >
              <p className="text-white mx-2 dark:text-black">from</p>
              <input
                type="time"
                className={`rounded-sm px-[.5px] bg-black border-[1px] border-[#554994] focus:border-white outline-none
                          dark:bg-white dark:text-black dark:border-[#7696ff] dark:focus:border-black`}
                name="select-time-1"
                onChange={handleChange}
              />
              <p className="text-white mx-2 dark:text-black">to</p>
              <input
                type="time"
                className={`rounded-sm px-[.5px] bg-black border-[1px] border-[#554994] focus:border-white outline-none
                          dark:bg-white dark:text-black dark:border-[#7696ff] dark:focus:border-black`}
                name="select-time-2"
                onChange={handleChange}
              />
            </div>
            <div className="mr-5">
              <button
                className={`px-2 py-1 flex hover:bg-opacity-40 bg-slate-800 hover:bg-slate-400 duration-100 ease-in rounded-lg mx-[-20px] border-[1px] border-slate-800 hover:border-white
                          dark:bg-[#7fb1fc] dark:border-blue-300 dark:text-black dark:hover:bg-blue-500 dark:hover:border-blue-800`}
                type="submit"
              >
                <div className="m-auto text-white dark:text-black">submit</div>
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={true}
        theme={props.theme ? "dark" : "light"}
      />
    </div>
  );
};

export default EventEditForm;
