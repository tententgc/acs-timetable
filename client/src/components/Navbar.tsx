import React, { useState } from "react";
import logo from "../assets/logo.png";
import Modal from "./Modal";
function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <nav className="bg-inherit border-gray-500">
        <div className="px-2 sm:px-4 py-2.5 rounded ">
          <div className="container flex flex-wrap justify-between items-center mx-auto h-14">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="Acs logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap"></span>
              </a>
            </div>

            <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
              <div className="flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
                <p
                  className="text-white hover:bg-slate-200 duration-500 ease-linear hover:text-black hover:underline px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Sign in
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <MainCalendar /> */}
      <Modal handleIsOpen={handleIsOpen} isOpen={isOpen} />
    </div>
  );
}

export default Navbar;
