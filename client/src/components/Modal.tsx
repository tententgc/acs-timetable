import React, { useState } from "react";
import photo from "../assets/sign-in-image.png";
import Login from "./Login";
import Register from "./Register";
import TabModal from "./TabModal";

const Modal: React.FC = () => {
  const items: Array<string> = ["Log in", "Register"];
  const [tabItem, setTabItem] = useState<string>(items[0]);

  const getTabItem = () => {
    return tabItem;
  };

  const setTab = (item: string) => {
    setTabItem(item);
  };

  return (
    <div className="fixed">
      <div className="fixed h-[630px] w-[840px] top-[calc(50%-630px/2)] left-[calc(50%-840px/2)] rounded-xl flex p-4 bg-white">
        <div className="flex object-cover">
          <img src={photo} alt="" />
        </div>
        <div className="ml-6 w-[370px]">
          <TabModal items={items} getTabItem={getTabItem} setTab={setTab} />

          {tabItem === "Log in" ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
