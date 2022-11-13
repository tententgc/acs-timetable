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
  required?: boolean;
}

const InputCustom: React.FC<InputCustomProps> = (props) => {
  return (
    <div>
      <input
        className={`w-full border-[1px] outline-none rounded-[3px] px-[10px] py-[3px] border-[#554994] focus:border-white bg-black text-white
                    dark:border-[#7696ff] dark:bg-white dark:text-black dark:focus:border-black
        ${props.errors ? "border-red-500" : ""}`}
        {...props}
      />
      {props.errors && <ErrorMessage message={props.errors} />}
    </div>
  );
};

export default InputCustom;
