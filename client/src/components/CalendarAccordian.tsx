import React, { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import Chip from "./Chip";

interface CalendarAccordianProps {
  color: string;
  header: string;
  description?: string;
  color_meaning?: string;
}

const CalendarAccordian: React.FC<CalendarAccordianProps> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current &&
      autoAnimate(parent.current, {
        duration: 300,
        disrespectUserMotionPreference: true,
      });
  }, [parent]);

  const reveal = () => setShow(!show);

  return (
    <div className="animate-popup">
      <div
        className={`bg-[#1D2A36] p-5 flex items-center rounded-xl gap-4 ${
          show ? "max-w-[50vw] max-h-[50vh] overflow-scroll" : ""
        }`}
      >
        <div>
          <div
            className={`w-6 rounded-full ${props.color} ${
              show ? "h-[10vh] w-2" : "h-6 w-6"
            } duration-300 ease-in-out`}
          ></div>
        </div>
        <div className="w-full duration-500" ref={parent}>
          <div className={`flex ${show ? "pb-2" : ""}`}>
            <div className="flex flex-col gap-5">
              <HeaderCustom
                className={`dropdown-label text-xl text-white hover:cursor-pointer ${
                  show ? "text-3xl font-bold" : "max-w-[15vw] truncate"
                }`}
                onClick={reveal}
              >
                {props.header}
              </HeaderCustom>
              {show && <Chip title="Study Break" />}
            </div>
            {show && (
              <div className="flex flex-grow items-start justify-end pl-10">
                <div
                  className="rounded-full p-2 hover:bg-slate-400 cursor-pointer duration-200 ease-linear"
                  onClick={reveal}
                >
                  <MdOutlineClose color="white" />
                </div>
              </div>
            )}
          </div>
          {show && <p className="text-white leading-7">{props.description}</p>}
        </div>
      </div>
    </div>
  );
};

export default CalendarAccordian;

const HeaderCustom = styled.p`
  position: relative;
  color: white;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    bottom: 0px;
    left: 0;
    background-color: white;
    transform-origin: bottom right;
    transition: transform 0.2s ease-out;
  }
  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
