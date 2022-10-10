import React from "react";
import Lottie from "lottie-react";

interface WaitingDataProps {
  animate: any;
}

const WaitingData: React.FC<WaitingDataProps> = (props) => {
  return (
    <div className="fixed z-[999] w-full h-full top-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="w-[30rem]">
        <Lottie animationData={props.animate} />
      </div>
    </div>
  );
};

export default WaitingData;
