import React, { useState } from "react";
import InputCustom from "./InputCustom";
import { FcCloseUpMode } from "react-icons/fc";
import { addLocalEvent, formDataType } from "../api/eventRouter";
import { CalendarStoreImpl } from "../store/CalendarStore";
import { ColorStoreImpl } from "../store/ColorStore";

interface EventFormProps {
  open: boolean;
  handleList: () => void;
  store: CalendarStoreImpl;
  role: string;
  colorStore: ColorStoreImpl;
}

const formItem: formDataType = {
  header: "",
  description: "",
  time_range: "",
  event_date: "",
};

const EventForm: React.FC<EventFormProps> = (props) => {
  const [formData, setFormData] = useState<formDataType>(formItem);

  const [timeRange, setTimeRange] = useState<{ t1: string; t2: string }>({
    t1: "",
    t2: "",
  });
  const [colorOption, setColorOption] = useState<string>(
    props.colorStore.theme[0].hex_code
  );

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.handleList();
    }
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColorOption(e.target.value);
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
    if (colorOption.length > 1) {
      formData.color = { hex_code: colorOption };
    }

    await addLocalEvent(formData);

    props.handleList();
    const date = `${props.store.currYear}-${(props.store.currMonth + 1)
      .toString()
      .padStart(2, "0")}`;
    props.store.setWorkAll(date);
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
          <div className="bg-white rounded-md p-2 max-h-[10rem]">
            <textarea
              className="w-full outline-none focus:border-[#554994] p-3 rounded-md"
              placeholder="description"
              name="description"
              onChange={handleChange}
              spellCheck={false}
              maxLength={255}
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
            {props.role === "ADMIN" ? (
              <div className="mx-2 h-5 flex items-center justify-center">
                <select
                  className="w-[6rem] h-6 px-2 outline-none rounded-sm"
                  onChange={handleChangeOption}
                  value={colorOption}
                >
                  {props.colorStore.adminSelect.map((item) => {
                    return (
                      <option value={item.hex_code} key={Math.random()}>
                        {item.color_meaning}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              ""
            )}
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
