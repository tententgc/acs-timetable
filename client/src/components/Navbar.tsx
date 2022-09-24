import React from "react";
import logo from "../assets/logo.png"; 
function Navbar() {

  return (
    <div>
      <nav className="bg-inherit border-gray-500  dark:bg-gray-900">
        <div className="px-2 sm:px-4 py-2.5 rounded ">
          <div className="container flex flex-wrap justify-between items-center mx-auto h-14">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img
                  src={logo}
                  className="mr-3 h-6 sm:h-9"
                  alt="Acs logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  
                </span>
                </a>
                
            </div>

            <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
              <div className="flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
                <a
                  href="/contact"
                  className="text-slate-600 hover:font-bold hover:text-slate-900 hover:underline px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
