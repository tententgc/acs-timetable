import React, { useState } from "react";
import {
  FcMenu,
  FcSettings,
  FcAddDatabase,
  FcCloseUpMode,
  FcRadarPlot,
  FcCapacitor,
} from "react-icons/fc";
import EventForm from "./EventForm";
import { CalendarStore } from "../store/CalendarStore";
import { ColorStore } from "../store/ColorStore";

const Drawer: React.FC<{ role: string; username: string }> = (props) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openList, setOpenList] = useState<{ form: boolean }>({ form: false });

  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      setOpenDrawer(false);
    }
  };

  const handleSignOut = (val: string) => {
    if (val === "Sign Out") {
      sessionStorage.clear();
      localStorage.clear();
      setOpenDrawer(false);
      window.location.reload();
    }

    if (val === "Create Event") {
      setOpenList({ ...setOpenList, form: true });
    }
  };

  const handleList = () => {
    setOpenList({ ...setOpenList, form: false });
  };

  return (
    <div>
      <div>
        <div className="menu-button">
          <button
            onClick={() => setOpenDrawer(true)}
            className="hover:bg-white p-1 rounded-full hover:bg-opacity-10 backdrop-blur-sm duration-100 ease-linear"
          >
            <FcMenu size={35} />
          </button>
        </div>
      </div>
      <div
        className={`${
          openDrawer
            ? "fixed top-0 left-0 w-[100vw] h-[100vh] z-[1001]"
            : "hidden"
        }`}
        onClick={handleClick}
      ></div>
      <div
        className={`bg-[#181828] w-[20vw] fixed top-0 right-0 h-[100vh] border-l-[1px] rounded-lg ${
          openDrawer ? "translate-x-0" : "translate-x-[20rem]"
        } duration-200 ease-in-out z-[1002]`}
      >
        <div className="relative">
          <div className="absolute p-2">
            <button
              className="hover:bg-slate-400 bg-opacity-10 ease-in duration-100 rounded-xl"
              onClick={() => setOpenDrawer(false)}
            >
              <FcCloseUpMode size={20} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 m-5">
            <div>
              <FcSettings
                size={30}
                className="animate-[spin_10s_linear_infinite]"
              />
            </div>
            <p className="text-white text-xl">{props.username}</p>
          </div>
          <div className="list-drawer mt-6">
            {props.role === "ADMIN" ? (
              <div
                className="my-2 px-5 py-2 hover:bg-slate-400 ease-in duration-100 cursor-pointer hover:bg-opacity-50"
                onClick={() => handleSignOut("Create Event")}
              >
                <div className="flex gap-4 items-center ">
                  <div>
                    <FcRadarPlot size={25} />
                  </div>
                  <p className="text-white">Add Admin Event</p>
                </div>
              </div>
            ) : (
              <div
                className="my-2 px-5 py-2 hover:bg-slate-400 ease-in duration-100 cursor-pointer hover:bg-opacity-50"
                onClick={() => handleSignOut("Create Event")}
              >
                <div className="flex gap-4 items-center ">
                  <div>
                    <FcAddDatabase size={25} />
                  </div>
                  <p className="text-white">Create Event</p>
                </div>
              </div>
            )}
            <div
              className="my-2 px-5 py-2 hover:bg-slate-400 ease-in duration-100 cursor-pointer hover:bg-opacity-50"
              onClick={() => handleSignOut("Sign Out")}
            >
              <div className="flex gap-4 items-center ">
                <div>
                  <FcCapacitor size={25} />
                </div>
                <p className="text-white">Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openList.form ? (
        <EventForm
          role={props.role}
          handleList={handleList}
          open={openList.form}
          store={CalendarStore}
          colorStore={ColorStore}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Drawer;
