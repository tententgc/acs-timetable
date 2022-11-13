import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SignUp } from "../api/authen";
import { checkCaseObj } from "../helper/checkCaseObj";
import { validateEmail } from "../helper/validateEmail";
import InputCustom from "./InputCustom";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { AuthenStoreImpl } from "../store/AuthenStore";
import { FcCheckmark } from "react-icons/fc";

interface formDataType {
  username: string;
  email: string;
  password: string;
}

interface ckeckBoxType {
  check1: boolean;
  check2: boolean;
}

interface awaitButtonType {
  onLoad: boolean;
  animate: any;
}

const formDefaultItem: formDataType = { username: "", email: "", password: "" };

const Register: React.FC<{ store: AuthenStoreImpl; theme: boolean }> = (
  props
) => {
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataType>(formDefaultItem);
  const [errors, setErrors] = useState<formDataType>(formDefaultItem);
  const [awaitButton, setAwaitButton] = useState<awaitButtonType>({
    onLoad: false,
    animate: <BsFillCloudUploadFill />,
  });

  const [checkBox, setCheckBox] = useState<ckeckBoxType>({
    check1: false,
    check2: false,
  });

  const checkBoxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox({
      ...checkBox,
      [e.target.name]: !checkBox[e.target.name as keyof ckeckBoxType],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!formData.username) {
      setErrors({ ...errors, username: "name is required" });
    } else if (!formData.email) {
      setErrors({ ...errors, email: "email is required" });
    } else if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "please check your email" });
    } else if (!formData.password) {
      setErrors({ ...errors, password: "password is required" });
    } else if (formData.password.length < 5 || formData.password.length > 20) {
      setErrors({ ...errors, password: "password is must be 5-20 charecters" });
    } else {
      setErrors(formDefaultItem);

      setAwaitButton({ ...awaitButton, onLoad: true });
      const res = await SignUp(formData);

      if (res === 201) {
        setAwaitButton({
          onLoad: true,
          animate: <FcCheckmark color="green" />,
        });
      } else {
        setAwaitButton({
          ...awaitButton,
          animate: <AiOutlineClose color="red" />,
        });
        setErrors({
          ...errors,
          email: "email already in use",
        });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-[27px] font-bold my-7 dark:text-black">
        Create account
      </h1>
      <div className="flex flex-row justify-between">
        <span className="px-5 py-2 rounded-sm bg-slate-300 dark:bg-slate-600">
          ?
        </span>
        <span className="px-5 py-2 rounded-sm bg-slate-300 dark:bg-slate-600">
          ?
        </span>
        <span className="px-5 py-2 rounded-sm bg-slate-300 dark:bg-slate-600">
          ?
        </span>
        <span className="px-5 py-2 rounded-sm bg-slate-300 dark:bg-slate-600">
          ?
        </span>
        <span className="px-5 py-2 rounded-sm bg-slate-300 dark:bg-slate-600">
          ?
        </span>
      </div>
      <div className="my-5">
        <p className="dark:text-black">Or log in with an email</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div>
            <InputCustom
              type="text"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
              name="username"
              errors={errors.username}
            />
          </div>
          <div className="relative">
            <InputCustom
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              errors={errors.email}
            />
          </div>
          <div className="relative">
            <div>
              <InputCustom
                type={isShowPass ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                maxLength={20}
                minLength={5}
                errors={errors.password}
              />
              {isShowPass ? (
                <FiEyeOff
                  onClick={() => setIsShowPass(!isShowPass)}
                  className="absolute right-1 top-2 cursor-pointer dark:stroke-black"
                  color="gray"
                />
              ) : (
                <FiEye
                  onClick={() => setIsShowPass(!isShowPass)}
                  className="absolute right-1 top-2 cursor-pointer dark:stroke-black"
                  color="gray"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col my-5">
          <div className="flex items-start">
            <input
              type="checkbox"
              name="check1"
              className="accent-black dark:accent-white"
              checked={checkBox.check1}
              onChange={checkBoxHandler}
            />
            <label
              htmlFor="title1"
              className="font-light ml-2 text-sm dark:text-black"
            >
              Agree to{" "}
              <span className="border-b-[1px] hover:border-black hover:text-black transition-all duration-250 cursor-pointer dark:text-black dark:border-b-black dark:hover:border-white dark:hover:text-white">
                Terms and Conditions
              </span>{" "}
              &{" "}
              <span className="border-b-[1px] hover:border-black hover:text-black transition-all duration-250 cursor-pointer dark:text-black dark:border-b-black dark:hover:border-white dark:hover:text-white">
                Privacy Policy
              </span>
            </label>
          </div>
          <div className="flex items-start mt-2">
            <input
              type="checkbox"
              name="check2"
              className="accent-black dark:accent-white"
              checked={checkBox.check2}
              onChange={checkBoxHandler}
            />
            <label
              htmlFor="title2"
              className="font-light ml-2 text-sm mt-[-3.5px] dark:text-black"
            >
              Agree to get time-saving{" "}
              <span className="border-b-[1px] hover:border-black hover:text-black transition-all duration-250 cursor-pointer dark:text-black dark:border-b-black dark:hover:border-white dark:hover:text-white">
                design articles
              </span>{" "}
              and new release notifications
            </label>
          </div>
        </div>
        <div className="my-5">
          <button
            className={`px-10 py-2 w-full h-full flex font-bold ${
              checkCaseObj({ ...formData, ...checkBox })
                ? "cursor-not-allowed  bg-[gray] text-gray-300 dark:bg-slate-300"
                : "bg-black text-white border-[1px] border-[#554994] hover:border-white dark:bg-white dark:border-[#7696ff] dark:hover:border-[black]"
            } duration-150 ease-linear`}
            onClick={handleSubmit}
            // disabled={checkCaseObj({ ...formData, ...checkBox })}
          >
            {awaitButton.onLoad ? (
              <div className="m-auto h-5">{awaitButton.animate}</div>
            ) : (
              <div className="m-auto h-5 dark:text-black">Register</div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
