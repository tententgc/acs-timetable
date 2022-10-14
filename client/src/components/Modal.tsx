import React, { useState } from "react";
import photo from "../assets/sign-in-image.png";
import Login from "./Login";
import Register from "./Register";
import TabModal from "./TabModal";
import { AiOutlineClose } from "react-icons/ai";
import { AuthenStoreImpl } from "../store/AuthenStore";

interface ModalProps {
  isOpen: boolean;
  store: AuthenStoreImpl;
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
      props.store.isOpenModal = !props.store.isOpenModal;
    }
  };

  return (
    <div
      className={`fixed bg-black w-full h-full top-0 backdrop-blur-sm bg-opacity-20 duration-150 ${
        props.isOpen ? "block" : "hidden"
      } z-[999]`}
      onClick={handleClick}
    >
      <div>
        <div
          className={`fixed h-[630px] w-[840px] top-[calc(50%-630px/2)] left-[calc(50%-840px/2)] rounded-xl flex p-4 bg-[#2c2a45] bg-opacity-95 ${
            props.isOpen ? "animate-popup" : ""
          }`}
        >
          <div className="flex object-cover">
            <img src={photo} alt="" />
          </div>
          <div className="ml-6 w-[370px]">
            <TabModal items={items} getTabItem={getTabItem} setTab={setTab} />

            {tabItem === "Log in" ? (
              <Login store={props.store} />
            ) : (
              <Register store={props.store} />
            )}
          </div>
          <div
            className="absolute right-[-60px] top-0 w-10 h-10 bg-[#2c2a45] rounded-full flex cursor-pointer border-[1px] border-[#2c2a45] hover:bg-black hover:border-white hover:text-white duration-300 ease-linear"
            onClick={() => (props.store.isOpenModal = !props.store.isOpenModal)}
          >
            <div className="m-auto">
              <AiOutlineClose />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
