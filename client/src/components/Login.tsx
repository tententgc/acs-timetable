import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { checkCaseObj } from "../helper/checkCaseObj";
import { validateEmail } from "../helper/validateEmail";
import InputCustom from "./InputCustom";
import { BiLoader } from "react-icons/bi";
import { FcCloseUpMode } from "react-icons/fc";
import { SignIn } from "../api/authen";
import { AuthenStoreImpl } from "../store/AuthenStore";

interface formDataType {
  email: string;
  password: string;
}

interface awaitButtonType {
  onLoad: boolean;
  animate: any;
}

const formDefaultItem: formDataType = { email: "", password: "" };

const Login: React.FC<{ store: AuthenStoreImpl }> = (props) => {
  const [formData, setFormData] = useState<formDataType>(formDefaultItem);
  const [isShowPass, setIsShowPass] = useState<Boolean>(false);
  const [errors, setErrors] = useState<formDataType>(formDefaultItem);
  const [awaitButton, setAwaitButton] = useState<awaitButtonType>({
    onLoad: false,
    animate: <BiLoader className="animate-spinAround" />,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!formData.email) {
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
      const res = await SignIn(formData);

      if (res !== 200) {
        setAwaitButton({
          animate: <FcCloseUpMode color="white" />,
          onLoad: true,
        });
        setErrors({
          ...errors,
          password: "email or password doesn't match",
        });
      } else {
        props.store.isOpenModal = false;
        setAwaitButton({ ...awaitButton, onLoad: false });
        window.location.reload();
      }
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-[27px] font-bold my-7 text-white">Log in to your account</h1>
      <div className="flex flex-row justify-between">
        <span className="px-5 py-2 rounded-sm bg-slate-300">?</span>
        <span className="px-5 py-2 rounded-sm bg-slate-300">?</span>
        <span className="px-5 py-2 rounded-sm bg-slate-300">?</span>
        <span className="px-5 py-2 rounded-sm bg-slate-300">?</span>
        <span className="px-5 py-2 rounded-sm bg-slate-300">?</span>
      </div>
      <div className="my-5 text-white">
        <p>Or log in with an email</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 relative">
          <div>
            <InputCustom
              errors={errors.email}
              onChange={handleChange}
              name="email"
              value={formData.email}
              placeholder="Email"
              type="email"
            />
          </div>
          <div className="relative">
            <InputCustom
              type={isShowPass ? "text" : "password"}
              errors={errors.password}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              name="password"
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
          </div>
        </div>
        <div className="mt-5">
          <button
            className={`px-10 py-2 w-full h-full flex font-bold ${
              checkCaseObj({ ...formData })
                ? "bg-[gray] text-gray-300 cursor-not-allowed"
                : "bg-black text-white cursor-pointer"
            } duration-150 ease-linear`}
            type="submit"
            onClick={handleSubmit}
            // disabled={checkCaseObj({ ...formData })}
          >
            {awaitButton.onLoad ? (
              <div className="m-auto h-5">{awaitButton.animate}</div>
            ) : (
              <div className="m-auto h-5">Login</div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
