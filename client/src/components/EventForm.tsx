import React, { useState } from "react";
import InputCustom from "./InputCustom";
import { FcCloseUpMode } from "react-icons/fc";
import { addLocalEvent, formDataType } from "../api/eventRouter";

interface EventFormProps {
  open: boolean;
  handleList: () => void;
}

const formItem: formDataType = {
  header: "",
  description: "",
  time_range: "",
  event_date: "",
};

const EventForm: React.FC<EventFormProps> = (props) => {
  const [formData, setFormData] = useState<formDataType>(formItem);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.handleList();
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addLocalEvent(formData);
    props.handleList();
    window.location.reload();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      e.target.name === "select-time-1" ||
      e.target.name === "select-time-2"
    ) {
      if (e.target.name === "select-time-1") {
        setFormData({
          ...formData,
          time_range: `from ${e.target.value} `,
        });
      } else {
        setFormData({
          ...formData,
          time_range: formData.time_range + `to ${e.target.value}`,
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
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
          className="w-[30rem] min-h-[10rem] bg-slate-700 rounded-lg p-5"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center my-2">
            <div className="w-[15rem]">
              <InputCustom
                onChange={handleChange}
                name="header"
                placeholder="header"
                type="text"
                value={formData.header}
                maxLength={200}
                required={true}
              />
            </div>
            <div>
              <input
                type="date"
                name="event_date"
                className="rounded-sm outline-none p-[2px]"
                required
                value={formData.event_date}
                onChange={handleChange}
              />
            </div>
            <div
              className="p-2 hover:bg-white hover:bg-opacity-30 ease-in duration-100 rounded-full"
              onClick={() => props.handleList()}
            >
              <FcCloseUpMode size={20} />
            </div>
          </div>
          <div>
            <textarea
              className="w-full outline-none focus:border-[#554994] p-3 rounded-md"
              placeholder="description"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex">
              <p className="text-white mx-2">from</p>
              <input
                type="time"
                className="rounded-sm px-[.5px]"
                name="select-time-1"
                onChange={handleChange}
              />
              <p className="text-white mx-2">to</p>
              <input
                type="time"
                className="rounded-sm px-[.5px]"
                name="select-time-2"
                onChange={handleChange}
              />
            </div>
            <div className="mr-5">
              <button
                className="px-2 py-1 flex hover:bg-opacity-40 hover:bg-slate-400 duration-100 ease-in rounded-lg"
                type="submit"
              >
                <div className="m-auto text-white">submit</div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
