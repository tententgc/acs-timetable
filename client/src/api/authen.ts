import { SIGNIN, SIGNUP, VERIFYTOKEN } from "./../config/API";
import axios, { AxiosResponse } from "axios";
import { getAcessToken } from "../helper/getToken";
// axios.defaults.baseURL = "http://localhost:1010/";

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

interface SignInProps {
  username: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  data?: {
    user_id: string;
    email: string;
    username: string;
    password: string;
    role: string;
    create_at: Date;
    update_at: Date;
  };
  status: number;
  error?: string;
}

interface SignInResponse {
  data?: {
    user_id: string;
    email: string;
    username: string;
    password: string;
    role: string;
    create_at: Date;
    update_at: Date;
  };
  status: number;
  error?: string;
  token?: string;
  role: string;
}

interface VerifyTokenResponse {
  status: number;
  role?: string;
  message: string;
}

const axios_default_option = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function SignUp(data: SignUpProps) {
  const res: AxiosResponse<SignUpResponse> = await axios.post(
    SIGNUP,
    data,
    axios_default_option
  );

  return res.data.status;
}

export async function SignIn(data: Omit<SignInProps, "username">) {
  const res: AxiosResponse<SignInResponse> = await axios.post(
    SIGNIN,
    data,
    axios_default_option
  );

  if (res.data.status === 200 && res.data.token && res.data.role === "ADMIN") {
    sessionStorage.setItem("access_token", res.data.token);
    return res.data.status;
  }

  if (res.data.status === 200 && res.data.token) {
    localStorage.setItem("access_token", res.data.token);
  }

  return res.data.status;
}

export async function VerifyToken() {
  const token = getAcessToken();

  const res: AxiosResponse<VerifyTokenResponse> = await axios.get(VERIFYTOKEN, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  });

  const obj: Omit<VerifyTokenResponse, "message"> = {
    role: res.data.role,
    status: res.data.status,
  };
  return obj;
}
