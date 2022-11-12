import React, { useEffect, useState } from "react";
import logo1 from "../assets/ACS-White.png";
import logo2 from "../assets/ACS-Black.png";
import Modal from "./Modal";
import { AuthenStore, AuthenStoreImpl } from "../store/AuthenStore";
import { observer } from "mobx-react";
import Drawer from "./Drawer";
import { MdDarkMode } from "react-icons/md";

const Navbar: React.FC<{ store: AuthenStoreImpl; handleChangeTheme:()=>void; theme:boolean}> = observer((props) => {
  const [isAuthen, setIsAuthen] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState<string>("");
 
  useEffect(() => {
    async function verifyToken() {
      const res = await props.store.verifyToken();
      if (res.status === 200 && res.role) {
        setIsAuthen(true);
        setRole(res.role);
        setUsername(res.username);
      }
    }

    verifyToken();
  }, [props.store]);

  return (
    <div className="">
      <nav className={`bg-inherit border-gray-500 `}>
        <div className="px-2 sm:px-4 py-2.5 rounded ">
          <div className="container flex flex-wrap justify-between items-center mx-auto h-14">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img src={props.theme ? logo1:logo2} className="mr-3 h-6 sm:h-16 sm:my-6" alt="Acs logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap"></span>
              </a>
            </div>

            <div className="">
              <p className={`bg-[#464675] duration-500 ease-linear absolute right-[16%] top-[4.8%] px-2 py-2 
              rounded-[100%] cursor-pointer hover:px-1 hover:py-1 hover:right-[16.2%] hover:top-[5.2%] bg-opacity-30 hover:bg-[#554994] dark:bg-[#94bddf] dark:bg-opacity-30 dark:bg-gradient-to-tl dark:hover:from-[#EBC5DA] dark:hover:to-[#99BAF6] dark:duration-500 dark:text-black`}
              onClick={props.handleChangeTheme}
              >
                {props.theme ? "🌚":"🌝"}
              </p>
            </div>

            {isAuthen ? (
              <Drawer role={role} username={username} />
            ) : (
              <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
                <div className="flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
                  <p
                    className="text-white hover:bg-slate-200 duration-500 ease-linear hover:text-black hover:underline px-3 py-2 rounded-md text-base font-medium cursor-pointer dark:bg-gradient-to-tl dark:hover:from-[#EBC5DA] dark:hover:to-[#99BAF6] dark:duration-500 dark:hover:text-white dark:text-black"
                    onClick={() =>
                      (props.store.isOpenModal = !props.store.isOpenModal)
                    }
                  >
                    Sign in
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
      </nav>
      {isAuthen ? (
        ""
      ) : (
        <Modal isOpen={props.store.isOpenModal} store={AuthenStore} />
      )}
    </div>
  );
});

export default Navbar;
