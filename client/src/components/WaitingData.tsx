import React from "react";
import Lottie from "lottie-react";
import animationLottie from "../assets/loading-colour.json";

const WaitingData = () => {
  return (
    <div className="fixed z-[999] w-full h-full top-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="w-[30rem]">
        <Lottie animationData={animationLottie} />
      </div>
    </div>
  );
};

export default WaitingData;
