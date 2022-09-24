import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [blankError, setBlankError] = useState<boolean>(false);

  const checkBoxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox(!checkBox);
  };

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (
      email.length === 0 ||
      password.length === 0 ||
      name.length === 0 ||
      !checkBox
    ) {
      setBlankError(true);
      return;
    }

    /*

      TODO fetch api data    method POST
      if bad status set Email Error

    */
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-[27px] font-bold my-7">Create account</h1>
      <div className="flex flex-row justify-between">
        <span className="px-5 py-2 rounded-sm bg-slate-300">A</span>
        <span className="px-5 py-2 rounded-sm bg-slate-300">A</span>
        <span className="px-5 py-2 rounded-sm bg-slate-300">A</span>
        <span className="px-5 py-2 rounded-sm bg-slate-300">A</span>
        <span className="px-5 py-2 rounded-sm bg-slate-300">A</span>
      </div>
      <div className="my-5">
        <p>Or log in with an email</p>
      </div>
      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`w-full border-[1px] outline-none rounded-[3px] px-[10px] py-[3px] focus:border-[#554994] ${
              blankError ? "border-red-500" : ""
            }`}
            placeholder="Name"
            value={name}
            onChange={nameHandler}
            required
          />
        </form>
        <form className="relative" onSubmit={handleSubmit}>
          <input
            type="email"
            className={`w-full border-[1px] outline-none rounded-[3px] px-[10px] py-[3px] focus:border-[#554994]  ${
              blankError || emailError ? "border-red-500" : ""
            }`}
            placeholder="Email"
            value={email}
            onChange={emailHandler}
            required
          />
          {emailError ? (
            <div className="absolute text-[8px] text-red-500">
              email already use
            </div>
          ) : (
            ""
          )}
        </form>
        <form className="relative" onSubmit={handleSubmit}>
          <input
            type={isShowPass ? "text" : "password"}
            className={`w-full border-[1px] outline-none rounded-[3px] pl-[10px] pr-[25px] py-[3px] focus:border-[#554994] ${
              blankError ? "border-red-500" : ""
            }`}
            placeholder="Password"
            value={password}
            onChange={passwordHandler}
            required
          />
          {isShowPass ? (
            <FiEyeOff
              onClick={() => setIsShowPass(!isShowPass)}
              className="absolute right-1 top-2 cursor-pointer"
              color="gray"
            />
          ) : (
            <FiEye
              onClick={() => setIsShowPass(!isShowPass)}
              className="absolute right-1 top-2 cursor-pointer"
              color="gray"
            />
          )}
        </form>
      </div>
      <div className="flex flex-col my-3">
        <div>
          <input
            type="checkbox"
            name="title1"
            className="accent-black"
            checked={checkBox}
            onChange={checkBoxHandler}
          />
          <label htmlFor="title1" className="font-light ml-2 text-sm">
            Agree to{" "}
            <span className="border-b-[1px] hover:border-black transition-all duration-250 cursor-pointer">
              Terms and Conditions
            </span>{" "}
            &{" "}
            <span className="border-b-[1px] hover:border-black transition-all duration-250 cursor-pointer">
              Privacy Policy
            </span>
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            name="title2"
            className="accent-black"
            checked={checkBox}
            onChange={checkBoxHandler}
          />
          <label htmlFor="title2" className="font-light ml-2 text-sm">
            Agree to get time-saving{" "}
            <span className="border-b-[1px] hover:border-black transition-all duration-250 cursor-pointer">
              design articles
            </span>{" "}
            and new release notifications
          </label>
        </div>
      </div>
      <div className="my-5">
        <button className="px-10 py-2 w-full h-full bg-gray-100 text-gray-300 font-bold">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
