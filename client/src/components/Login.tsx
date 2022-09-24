import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login: React.FC = () => {
  const [isShowPass, setIsShowPass] = useState<Boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }

    /*
    
      TODO fetch api data    method POST

      if bad status set email error

    */
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-[27px] font-bold my-7">Log in to your account</h1>
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
      <div className="flex flex-col gap-5 relative">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className={`w-full border-[1px] outline-none rounded-[3px] px-[10px] py-[3px] focus:border-[#554994] ${
              emailError ? "border-red-500" : ""
            }`}
            placeholder="Email"
            pattern=".+@gmail.com"
            value={email}
            onChange={emailHandler}
          />
          {emailError ? (
            <div className="absolute text-[8px] text-red-500">
              Incorrect email or password
            </div>
          ) : (
            ""
          )}
        </form>
        <form className="relative" onSubmit={handleSubmit}>
          <input
            type={isShowPass ? "text" : "password"}
            className={`w-full border-[1px] outline-none rounded-[3px] pl-[10px] pr-[25px] py-[3px] focus:border-[#554994] ${
              passwordError ? "border-red-500" : ""
            }`}
            placeholder="Password"
            required
            value={password}
            onChange={passwordHandler}
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
      <div className="my-5 flex">
        <span className=" border-b-2 cursor-pointer hover:border-slate-400">
          <p>Forgot your password?</p>
        </span>
      </div>
      <div>
        <button
          className={`px-10 py-2 w-full h-full font-bold ${
            !(email.length === 0 || password.length === 0)
              ? "bg-black text-white cursor-pointer"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }`}
          type="submit"
          disabled={email.length === 0 || password.length === 0}
          onClick={handleSubmit}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
