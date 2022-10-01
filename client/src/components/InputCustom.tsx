import React from "react";
import ErrorMessage from "./ErrorMessage";

interface InputCustomProps {
  errors?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  maxLength?: number;
  minLength?: number;
}

const InputCustom: React.FC<InputCustomProps> = (props) => {
  return (
    <div>
      <input
        className={`w-full border-[1px] outline-none rounded-[3px] px-[10px] py-[3px] focus:border-[#554994] ${
          props.errors ? "border-red-500" : ""
        }`}
        {...props}
      />
      {props.errors ? <ErrorMessage message={props.errors} /> : ""}
    </div>
  );
};

export default InputCustom;
