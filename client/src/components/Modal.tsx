import React, { useState } from "react";
import photo from "../assets/sign-in-image.png";
import Login from "./Login";
import Register from "./Register";
import TabModal from "./TabModal";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  handleIsOpen: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
  const items: Array<string> = ["Log in", "Register"];
  const [tabItem, setTabItem] = useState<string>(items[0]);

  const getTabItem = () => {
    return tabItem;
  };

  const setTab = (item: string) => {
    setTabItem(item);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.handleIsOpen();
    }
  };

  return (
    <div
      className={`fixed bg-black w-full h-full top-0 backdrop-blur-sm bg-opacity-20 duration-150 ${
        props.isOpen ? "block" : "hidden"
      }`}
      onClick={handleClick}
    >
      <div
        className={`fixed h-[630px] w-[840px] top-[calc(50%-630px/2)] left-[calc(50%-840px/2)] rounded-xl flex p-4 bg-white ${
          props.isOpen ? "animate-popup" : ""
        }`}
      >
        <div className="flex object-cover">
          <img src={photo} alt="" />
        </div>
        <div className="ml-6 w-[370px]">
          <TabModal items={items} getTabItem={getTabItem} setTab={setTab} />

          {tabItem === "Log in" ? <Login /> : <Register />}
        </div>
      </div>
      <div
        className="fixed top-[10%] left-[80%] w-10 h-10 bg-white rounded-full flex cursor-pointer"
        onClick={() => props.handleIsOpen()}
      >
        <div className="m-auto">
          <AiOutlineClose />
        </div>
      </div>
    </div>
  );
};

export default Modal;
