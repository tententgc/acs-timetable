import React, { useState } from "react";
import photo from "../assets/sign-in-image2.png";
import Login from "./Login";
import Register from "./Register";
import TabModal from "./TabModal";
import { FiX } from "react-icons/fi";
import { AuthenStoreImpl } from "../store/AuthenStore";
import photo2 from "../assets/sign-in-image.png";

interface ModalProps {
  isOpen: boolean;
  store: AuthenStoreImpl;
  theme: boolean;
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
          className={`fixed h-[630px] w-[900px] top-[calc(50%-630px/2)] left-[calc(50%-840px/2)] rounded-xl flex p-4 bg-[#2c2a45] bg-opacity-95
           dark:bg-blue-200 dark:bg-opacity-95 ${
             props.isOpen ? "animate-popup" : ""
           }`}
        >
          <div className="flex object-cover">
            <img src={props.theme ? photo : photo2} alt="" />
          </div>
          <div className="ml-6 w-[370px]">
            <TabModal items={items} getTabItem={getTabItem} setTab={setTab} />

            {tabItem === "Log in" ? (
              <Login store={props.store} theme={props.theme} />
            ) : (
              <Register store={props.store} theme={props.theme} />
            )}
          </div>
          <div
            className={`absolute right-[-60px] top-0 w-10 h-10 bg-[#2c2a45] rounded-full flex cursor-pointer hover:border-[1px] border-[#2c2a45] hover:bg-black hover:border-white duration-300 ease-linear
                        dark:bg-blue-200 dark:hover:bg-white dark:hover:border-black dark:hover:bg-opacity-90`}
            onClick={() => (props.store.isOpenModal = !props.store.isOpenModal)}
          >
            <div className="m-auto">
              <FiX className="dark:stroke-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
