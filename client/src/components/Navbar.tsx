import React, { useEffect, useState } from "react";
import logo from "../assets/ACS-White.png";
import Modal from "./Modal";
import { AuthenStore, AuthenStoreImpl } from "../store/AuthenStore";
import { observer } from "mobx-react";
import Drawer from "./Drawer";

const Navbar: React.FC<{ store: AuthenStoreImpl }> = observer((props) => {
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
      <nav className="bg-inherit border-gray-500">
        <div className="px-2 sm:px-4 py-2.5 rounded ">
          <div className="container flex flex-wrap justify-between items-center mx-auto h-14">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img src={logo} className="mr-3 h-6 sm:h-14" alt="Acs logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap"></span>
              </a>
            </div>
            {isAuthen ? (
              <Drawer role={role} username={username} />
            ) : (
              <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
                <div className="flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
                  <p
                    className="text-white hover:bg-slate-200 duration-500 ease-linear hover:text-black hover:underline px-3 py-2 rounded-md text-base font-medium cursor-pointer"
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
