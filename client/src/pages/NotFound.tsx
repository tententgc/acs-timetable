import React from "react";
import notFoundsvg from "../assets/404-not-found.svg";
import "../styles/notfound.css";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-10">
      <div className="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
      </div>
      <div className="relative flex flex-col gap-10">
        <div className="flex items-end gap-5">
          <img src={notFoundsvg} alt="" className="w-[20vw]" />
          <p className="text-6xl text-white animate-bounce">Thanyapisit</p>
        </div>
        <div className="flex justify-center">
          <button className="bg-white px-5 py-2 rounded-lg border-2 hover:bg-slate-500 hover:text-white duration-500 ease-linear">
            <a href="../">Back to home</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
